from rest_framework import viewsets
from .models import Plan
from .serializers import PlanSerializer

from accounts.permissions import IsAdminRole

class PlanViewSet(viewsets.ModelViewSet):

    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    permission_classes = [IsAdminRole]