from rest_framework import generics, permissions, filters
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer


class CategoryListView(generics.ListCreateAPIView):
    queryset           = Category.objects.all()
    serializer_class   = CategorySerializer
    permission_classes = [permissions.AllowAny]


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset           = Category.objects.all()
    serializer_class   = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ProductListView(generics.ListCreateAPIView):
    serializer_class   = ProductSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends    = [filters.SearchFilter, filters.OrderingFilter]
    search_fields      = ['name', 'brand', 'description']
    ordering_fields    = ['price_eur', 'created_at', 'stock']

    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True)

        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__slug=category)

        prix_min = self.request.query_params.get('prix_min')
        if prix_min:
            queryset = queryset.filter(price_eur__gte=prix_min)

        prix_max = self.request.query_params.get('prix_max')
        if prix_max:
            queryset = queryset.filter(price_eur__lte=prix_max)

        return queryset


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset           = Product.objects.all()
    serializer_class   = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]