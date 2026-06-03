from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    PaymentViewSet,
    RevenueStatsView
)

router = DefaultRouter()

router.register(
    r'',
    PaymentViewSet,
    basename='payments'
)

urlpatterns = router.urls

urlpatterns += [
    path(
        'revenue/',
        RevenueStatsView.as_view(),
        name='revenue-stats'
    ),
]