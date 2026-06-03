from rest_framework import viewsets

from .models import Tenant
from .serializers import TenantSerializer

from accounts.permissions import IsAdminUserRole


class TenantViewSet(viewsets.ModelViewSet):

    queryset = Tenant.objects.all()

    serializer_class = TenantSerializer

    permission_classes = [IsAdminUserRole]