from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name_fr', 'name_en', 'slug', 'parent']
    search_fields = ['name_fr', 'name_en']

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'brand', 'category', 'price_eur', 'stock', 'is_active', 'image_preview']
    list_filter  = ['is_active', 'category']
    search_fields = ['name', 'brand']
    readonly_fields = ['image_preview']

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height:50px; border-radius:4px;" />', obj.image.url)
        return "—"
    image_preview.short_description = 'Aperçu'