from django.urls import path
from .views import DashboardStatsView, UserDashboardView

urlpatterns = [
    path(
        '',
        DashboardStatsView.as_view()
    ),
    path(
    'user-dashboard/',
    UserDashboardView.as_view()
),
]