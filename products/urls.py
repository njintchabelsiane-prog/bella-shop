from django.urls import path
from .views import CategoryListView, CategoryDetailView, ProductListView, ProductDetailView

urlpatterns = [
    path('categories/',           CategoryListView.as_view(),   name='category-list'),
    path('categories/<uuid:pk>/', CategoryDetailView.as_view(), name='category-detail'),
    path('',                      ProductListView.as_view(),    name='product-list'),
    path('<uuid:pk>/',            ProductDetailView.as_view(),  name='product-detail'),
]