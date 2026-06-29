from django.contrib import admin
from .models import Order, OrderItem, CartItem

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display  = ['order_number', 'user', 'status', 'total_amount', 'currency', 'created_at']
    list_filter   = ['status', 'currency']
    search_fields = ['order_number', 'user__email']

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'product', 'quantity', 'unit_price', 'subtotal']

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['user', 'product', 'quantity', 'added_at']