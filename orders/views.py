from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Order, OrderItem, CartItem
from .serializers import OrderSerializer, OrderItemSerializer, CartItemSerializer
from products.models import Product


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

        import random
        from django.utils import timezone
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