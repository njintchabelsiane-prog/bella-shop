import uuid
from django.db import models
from accounts.models import User
from products.models import Product


class Review(models.Model):
    id          = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user        = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    product     = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    rating      = models.PositiveSmallIntegerField()
    comment     = models.TextField(blank=True)
    is_approved = models.BooleanField(default=False)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'review'
        unique_together = ('user', 'product')
        verbose_name = 'Avis'

    def __str__(self):
        return f"Avis de {self.user.email} sur {self.product.name} — {self.rating}/5"