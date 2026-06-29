from django.contrib import admin
from .models import Payment

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display  = ['stripe_payment_id', 'order', 'amount', 'currency', 'status', 'created_at']
    list_filter   = ['status', 'currency']
    search_fields = ['stripe_payment_id']