from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    ROLE_CHOICES = (
        ('SUPER_ADMIN', 'Super Admin'),
        ('TENANT_ADMIN', 'Tenant Admin'),
        ('USER', 'User'),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='USER'
    )

    tenant = models.ForeignKey(
        'tenants.Tenant',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='users'
    )

    phone = models.CharField(
        max_length=15,
        blank=True,
        null=True
    )

    google_id = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.username