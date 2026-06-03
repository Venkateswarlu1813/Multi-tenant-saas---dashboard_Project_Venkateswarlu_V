from django.db.models import Sum
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Payment
from .serializers import PaymentSerializer


class PaymentViewSet(viewsets.ModelViewSet):

    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]


class RevenueStatsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        total_revenue = (
            Payment.objects
            .filter(status="SUCCESS")
            .aggregate(total=Sum("amount"))
        )

        return Response({
            "revenue": total_revenue["total"] or 0
        })