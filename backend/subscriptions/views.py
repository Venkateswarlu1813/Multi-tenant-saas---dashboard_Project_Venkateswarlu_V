from rest_framework import viewsets

from .models import Subscription
from .serializers import SubscriptionSerializer

from accounts.permissions import IsAdminUserRole

from payments.models import Payment
from tenants.models import Tenant


class SubscriptionViewSet(viewsets.ModelViewSet):

    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAdminUserRole]

    def perform_create(self, serializer):

        subscription = serializer.save()

        tenant = Tenant.objects.first()

        Payment.objects.create(
            tenant=tenant,
            subscription=subscription,
            amount=subscription.plan.price,
            invoice_number=f"INV{subscription.id}",
            transaction_id=f"TXN{subscription.id}",
            payment_method="UPI",
            status="SUCCESS"
        )