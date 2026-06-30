from rest_framework import serializers
from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model  = Category
        fields = ['id', 'name_fr', 'name_en', 'slug', 'parent', 'created_at']


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name_fr', read_only=True)
    average_rating = serializers.FloatField(read_only=True)

    class Meta:
        model  = Product
        fields = [
            'id', 'name', 'description', 'price_eur',
            'stock', 'brand', 'images', 'is_active',
            'category', 'category_name', 'average_rating', 'created_at'
        ]