from django.urls import path
from .views import (
    CartListView, CartItemDetailView,
    OrderListView, OrderDetailView, CreateOrderView,
    create_checkout_session, confirm_order,
)

urlpatterns = [
    path('cart/',              CartListView.as_view(),       name='cart-list'),
    path('cart/<uuid:pk>/',    CartItemDetailView.as_view(), name='cart-detail'),
    path('',                   OrderListView.as_view(),      name='order-list'),
    path('<uuid:pk>/',         OrderDetailView.as_view(),    name='order-detail'),
    path('create/',            CreateOrderView.as_view(),    name='order-create'),
    path('checkout/',          create_checkout_session,      name='order-checkout'),
    path('confirm/',           confirm_order,                name='order-confirm'),
]