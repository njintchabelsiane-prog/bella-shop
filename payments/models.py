import uuid
from django.db import models
from orders.models import Order


class Payment(models.Model):
    class Status(models.TextChoices):
        PENDING  = 'PENDING',  'En attente'
        SUCCESS  = 'SUCCESS',  'Réussi'
        FAILED   = 'FAILED',   'Échoué'
        REFUNDED = 'REFUNDED', 'Remboursé'

    class Currency(models.TextChoices):
        EUR = 'EUR', 'Euro'
        USD = 'USD', 'Dollar US'
        XAF = 'XAF', 'Franc CFA'

    id                = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order             = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='payment')
    stripe_payment_id = models.CharField(max_length=200, unique=True)
    amount            = models.DecimalField(max_digits=10, decimal_places=2)
    currency          = models.CharField(max_length=3, choices=Currency.choices, default=Currency.EUR)
    status            = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
    payment_method    = models.CharField(max_length=50, blank=True)
    created_at        = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'payment'
        verbose_name = 'Paiement'

    def __str__(self):
        return f"Paiement {self.stripe_payment_id} — {self.status}"