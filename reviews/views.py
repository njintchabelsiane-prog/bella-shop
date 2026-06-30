from rest_framework import generics, permissions
from .models import Review
from .serializers import ReviewSerializer


class ReviewListView(generics.ListCreateAPIView):
    serializer_class   = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        product_id = self.request.query_params.get('product')
        if product_id:
            return Review.objects.filter(
                product=product_id,
                is_approved=True
            )
        return Review.objects.filter(is_approved=True)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ReviewDetailView(generics.RetrieveDestroyAPIView):
    serializer_class   = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Review.objects.filter(user=self.request.user)