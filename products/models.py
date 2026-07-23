import uuid
from django.core.exceptions import ValidationError
from django.db import models
from accounts.models import User


class Category(models.Model):
    id         = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    parent     = models.ForeignKey(
        'self',
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='subcategories'
    )
    name_fr    = models.CharField(max_length=100)
    name_en    = models.CharField(max_length=100)
    slug       = models.SlugField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'category'
        verbose_name = 'Catégorie'

    def __str__(self):
        return self.name_fr

    def clean(self):
        # Interdit l'auto-référence (une catégorie ne peut pas être sa propre parente)
        if self.parent and self.parent.pk == self.pk:
            raise ValidationError(
                {"parent": "Une catégorie ne peut pas être sa propre parente."}
            )
        # Interdit les boucles indirectes (A → B → A)
        ancetre = self.parent
        while ancetre is not None:
            if ancetre.pk == self.pk:
                raise ValidationError(
                    {"parent": "Boucle détectée : cette catégorie est déjà un ancêtre du parent choisi."}
                )
            ancetre = ancetre.parent


class Product(models.Model):
    id          = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category    = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    name        = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price_eur   = models.DecimalField(max_digits=10, decimal_places=2)
    stock       = models.PositiveIntegerField(default=0)
    brand       = models.CharField(max_length=100, blank=True)
    image       = models.ImageField(upload_to='bella_shop/products/', blank=True, null=True)
    images      = models.JSONField(default=list, blank=True)
    is_active   = models.BooleanField(default=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'product'
        verbose_name = 'Produit'

    def __str__(self):
        return self.name

    @property
    def average_rating(self):
        reviews = self.reviews.filter(is_approved=True)
        if reviews.exists():
            return round(sum(r.rating for r in reviews) / reviews.count(), 1)
        return 0