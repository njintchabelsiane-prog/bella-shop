from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from orders.models import Order
from .models import Payment
from .serializers import PaymentSerializer
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY


class CreatePaymentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        order_id = request.data.get('order_id')

        try:
            order = Order.objects.get(id=order_id, user=request.user)
        except Order.DoesNotExist:
            return Response({'error': 'Commande introuvable'}, status=status.HTTP_404_NOT_FOUND)

        try:
            intent = stripe.PaymentIntent.create(
                amount   = int(order.total_amount * 100),
                currency = order.currency.lower(),
                metadata = {'order_id': str(order.id)}
            )

            Payment.objects.create(
                order             = order,
                stripe_payment_id = intent['id'],
                amount            = order.total_amount,
                currency          = order.currency,
                status            = 'PENDING',
            )

            return Response({
                'client_secret': intent['client_secret'],
                'payment_id':    intent['id'],
            })

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class PaymentSuccessView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        payment_id = request.data.get('payment_id')

        try:
            payment        = Payment.objects.get(stripe_payment_id=payment_id)
            payment.status = 'SUCCESS'
            payment.save()
            payment.order.status = 'CONFIRMED'
            payment.order.save()
            return Response({'message': 'Paiement confirmé'})
        except Payment.DoesNotExist:
            return Response({'error': 'Paiement introuvable'}, status=status.HTTP_404_NOT_FOUND)