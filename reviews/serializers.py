from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    user_name    = serializers.CharField(source='user.first_name', read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model  = Review
        fields = [
            'id', 'user', 'user_name', 'product', 'product_name',
            'rating', 'comment', 'is_approved', 'created_at'
        ]
        read_only_fields = ['id', 'user', 'is_approved', 'created_at']