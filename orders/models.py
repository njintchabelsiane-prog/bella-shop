import uuid
from django.db import models
from accounts.models import User
from products.models import Product


class Order(models.Model):
    class Status(models.TextChoices):
        PENDING   = 'PENDING',   'En attente'
        CONFIRMED = 'CONFIRMED', 'Confirmée'
        SHIPPED   = 'SHIPPED',   'Expédiée'
        DELIVERED = 'DELIVERED', 'Livrée'
        CANCELLED = 'CANCELLED', 'Annulée'

    class Currency(models.TextChoices):
        EUR = 'EUR', 'Euro'
        USD = 'USD', 'Dollar US'
        XAF = 'XAF', 'Franc CFA'

    id               = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user             = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    order_number     = models.CharField(max_length=20, unique=True)
    status           = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
    total_amount     = models.DecimalField(max_digits=10, decimal_places=2)
    currency         = models.CharField(max_length=3, choices=Currency.choices, default=Currency.EUR)
    delivery_address = models.JSONField()
    tracking_number  = models.CharField(max_length=100, blank=True)
    created_at       = models.DateTimeField(auto_now_add=True)
    updated_at       = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'order'
        verbose_name = 'Commande'
        ordering = ['-created_at']

    def __str__(self):
        return f"Commande {self.order_number} — {self.user.email}"


class OrderItem(models.Model):
    id         = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order      = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product    = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, related_name='order_items')
    quantity   = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal   = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'order_item'
        verbose_name = 'Ligne commande'

    def __str__(self):
        return f"{self.product.name if self.product else 'Produit supprimé'} x{self.quantity}"

    def save(self, *args, **kwargs):
        self.subtotal = self.unit_price * self.quantity
        super().save(*args, **kwargs)


class CartItem(models.Model):
    id       = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user     = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart_items')
    product  = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='cart_items')
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'cart_item'
        unique_together = ('user', 'product')
        verbose_name = 'Article panier'

    def __str__(self):
        return f"{self.user.email} — {self.product.name} x{self.quantity}"

    @property
    def subtotal(self):
        return self.product.price_eur * self.quantity