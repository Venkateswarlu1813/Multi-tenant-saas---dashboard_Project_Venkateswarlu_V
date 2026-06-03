from django.db import models
from accounts.models import User
from plans.models import Plan


class Subscription(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    plan = models.ForeignKey(
        Plan,
        on_delete=models.CASCADE
    )

    start_date = models.DateField()

    end_date = models.DateField()

    active = models.BooleanField(
        default=True
    )

    def __str__(self):
        return f"{self.user.username} - {self.plan.name}"