from django.db import models

class AnalyticsRecord(models.Model):

    total_users = models.IntegerField(default=0)

    total_revenue = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    active_subscriptions = models.IntegerField(
        default=0
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )