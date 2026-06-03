from django.db import models


class Tenant(models.Model):

    STATUS_CHOICES = (
        ('ACTIVE', 'ACTIVE'),
        ('INACTIVE', 'INACTIVE'),
    )

    company_name = models.CharField(
        max_length=255
    )

    domain = models.CharField(
        max_length=255,
        unique=True
    )

    industry = models.CharField(
        max_length=100
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='ACTIVE'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.company_name