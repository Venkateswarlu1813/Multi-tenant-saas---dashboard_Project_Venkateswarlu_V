from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from accounts.models import User
from tenants.models import Tenant
from plans.models import Plan
from subscriptions.models import Subscription
from payments.models import Payment
from notifications_app.models import Notification


class DashboardStatsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        total_users = User.objects.count()

        total_tenants = Tenant.objects.count()

        total_plans = Plan.objects.count()

        active_subscriptions = Subscription.objects.filter(
             active=True
            ).count()
        total_revenue = sum(
            payment.amount
            for payment in Payment.objects.filter(
                status='SUCCESS'
            )
        )

        unread_notifications = Notification.objects.filter(
            is_read=False
        ).count()

        return Response({
            "total_users": total_users,
            "total_tenants": total_tenants,
            "total_plans": total_plans,
            "active_subscriptions": active_subscriptions,
            "total_revenue": total_revenue,
            "unread_notifications": unread_notifications
        })
    
class UserDashboardView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        notifications = Notification.objects.filter(
            user=user
        ).count()

        return Response({
            "username": user.username,
            "role": user.role,
            "notifications": notifications
        })