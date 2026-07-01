from django.contrib import admin
from .models import Category, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name_fr', 'name_en', 'slug', 'parent']
    search_fields = ['name_fr', 'name_en']

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'brand', 'category', 'price_eur', 'stock', 'is_active']
    list_filter  = ['is_active', 'category']
    search_fields = ['name', 'brand']