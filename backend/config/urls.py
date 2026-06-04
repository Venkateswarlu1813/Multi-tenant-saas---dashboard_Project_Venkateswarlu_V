from django.contrib import admin
from django.urls import path, include

from analytics_app.views import DashboardStatsView

urlpatterns = [

    path('admin/', admin.site.urls),

    path('api/auth/', include('accounts.urls')),

    path('api/plans/', include('plans.urls')),

    path('api/subscriptions/', include('subscriptions.urls')),

    path('api/payments/', include('payments.urls')),

    path('api/notifications/', include('notifications_app.urls')),


    path(
    'api/tenants/',
    include('tenants.urls')
    ),

    path(
    'api/payments/',
    include('payments.urls')
    ),

    path(
    'api/notifications/',
    include(
        'notifications_app.urls')
    ),

    path(
    'api/dashboard/',
    include('analytics_app.urls')
),

    path(
    'api/audit-logs/',
    include(
        'audit_logs.urls')
        ),
]