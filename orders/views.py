import random
import stripe
from django.conf import settings
from django.utils import timezone
from django.utils.crypto import get_random_string
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Order, OrderItem, CartItem
from .serializers import OrderSerializer, OrderItemSerializer, CartItemSerializer
from products.models import Product
from payments.models import Payment

stripe.api_key = settings.STRIPE_SECRET_KEY


# ─── Vues existantes (panier serveur / commandes classiques) ───

class CartListView(generics.ListCreateAPIView):
    serializer_class   = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CartItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class   = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)


class OrderListView(generics.ListAPIView):
    serializer_class   = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class OrderDetailView(generics.RetrieveAPIView):
    serializer_class   = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class CreateOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        cart_items = CartItem.objects.filter(user=request.user)
        if not cart_items.exists():
            return Response({'error': 'Panier vide'}, status=status.HTTP_400_BAD_REQUEST)

        total = sum(item.product.price_eur * item.quantity for item in cart_items)

        order = Order.objects.create(
            user             = request.user,
            order_number     = f"BS-{timezone.now().year}-{random.randint(1000,9999)}",
            total_amount     = total,
            delivery_address = request.data.get('delivery_address', {}),
        )

        for item in cart_items:
            OrderItem.objects.create(
                order      = order,
                product    = item.product,
                quantity   = item.quantity,
                unit_price = item.product.price_eur,
                subtotal   = item.product.price_eur * item.quantity,
            )

        cart_items.delete()

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


# ─── Nouvelles vues : tunnel de paiement Stripe ───

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_checkout_session(request):
    """
    Reçoit le panier depuis le frontend (panier client, pas CartItem serveur) :
    { "items": [{ "product_id": "...", "quantity": 2 }, ...] }
    Crée la Order + les OrderItem, puis une session Stripe Checkout.
    """
    cart_items = request.data.get('items', [])

    if not cart_items:
        return Response({"error": "Le panier est vide."}, status=status.HTTP_400_BAD_REQUEST)

    order_items_data = []
    total_amount = 0
    stripe_line_items = []

    for entry in cart_items:
        try:
            product = Product.objects.get(id=entry['product_id'], is_active=True)
        except Product.DoesNotExist:
            return Response(
                {"error": f"Produit introuvable : {entry.get('product_id')}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        quantity = int(entry.get('quantity', 1))
        if quantity < 1:
            continue

        unit_price = product.price_eur
        subtotal = unit_price * quantity
        total_amount += subtotal

        order_items_data.append({
            'product': product,
            'quantity': quantity,
            'unit_price': unit_price,
        })

        stripe_line_items.append({
            'price_data': {
                'currency': 'eur',
                'product_data': {'name': product.name},
                'unit_amount': int(unit_price * 100),
            },
            'quantity': quantity,
        })

    if not order_items_data:
        return Response({"error": "Le panier est vide."}, status=status.HTTP_400_BAD_REQUEST)

    order = Order.objects.create(
        user=request.user,
        order_number=f"BS-{get_random_string(8).upper()}",
        status=Order.Status.PENDING,
        total_amount=total_amount,
        delivery_address={},
    )

    for item in order_items_data:
        OrderItem.objects.create(order=order, **item)

    frontend_url = settings.FRONTEND_URL
    session = stripe.checkout.Session.create(
        mode='payment',
        payment_method_types=['card'],
        line_items=stripe_line_items,
        customer_email=request.user.email,
        shipping_address_collection={'allowed_countries': ['FR', 'BE', 'CH', 'LU']},
        success_url=f"{frontend_url}/commande/succes?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{frontend_url}/panier",
        metadata={'order_id': str(order.id)},
    )

    Payment.objects.create(
        order=order,
        stripe_payment_id=session.id,
        amount=total_amount,
        status=Payment.Status.PENDING,
    )

    return Response({"checkout_url": session.url}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def confirm_order(request):
    """
    Appelé par la page Succès avec ?session_id=...
    Vérifie auprès de Stripe que le paiement est bien passé, puis confirme la commande.
    """
    session_id = request.GET.get('session_id')
    if not session_id:
        return Response({"error": "session_id manquant."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        session = stripe.checkout.Session.retrieve(session_id)
    except stripe.error.StripeError:
        return Response({"error": "Session Stripe introuvable."}, status=status.HTTP_404_NOT_FOUND)

    payment = Payment.objects.filter(stripe_payment_id=session_id).first()
    if not payment:
        return Response({"error": "Paiement introuvable."}, status=status.HTTP_404_NOT_FOUND)

    order = payment.order

    if session.payment_status == 'paid':
        if order.status == Order.Status.PENDING:
            order.status = Order.Status.CONFIRMED
            shipping = session.get('collected_information', {}).get('shipping_details') if session.get('collected_information') else None
            if shipping:
                order.delivery_address = shipping
            order.save()

            payment.status = Payment.Status.SUCCESS
            payment.payment_method = 'card'
            payment.save()

        return Response(OrderSerializer(order).data, status=status.HTTP_200_OK)

    return Response({"error": "Paiement non confirmé."}, status=status.HTTP_402_PAYMENT_REQUIRED)