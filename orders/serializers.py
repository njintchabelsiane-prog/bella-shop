from rest_framework import serializers
from .models import Order, OrderItem, CartItem
from products.serializers import ProductSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model  = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'unit_price', 'subtotal']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model  = Order
        fields = [
            'id', 'order_number', 'status', 'total_amount',
            'currency', 'delivery_address', 'tracking_number',
            'created_at', 'updated_at', 'items'
        ]
        read_only_fields = ['id', 'order_number', 'created_at', 'updated_at']


class CartItemSerializer(serializers.ModelSerializer):
    product_name  = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.DecimalField(source='product.price_eur', max_digits=10, decimal_places=2, read_only=True)
    subtotal      = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model  = CartItem
        fields = ['id', 'product', 'product_name', 'product_price', 'quantity', 'subtotal', 'added_at']