from django.urls import path
from .views import CreatePaymentView, PaymentSuccessView

urlpatterns = [
    path('create/',  CreatePaymentView.as_view(),  name='payment-create'),
    path('success/', PaymentSuccessView.as_view(), name='payment-success'),
]