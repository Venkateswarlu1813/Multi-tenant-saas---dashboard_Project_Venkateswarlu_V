from django.db import models


class Payment(models.Model):

    STATUS_CHOICES = (
        ('SUCCESS', 'SUCCESS'),
        ('PENDING', 'PENDING'),
        ('FAILED', 'FAILED'),
    )

    PAYMENT_METHODS = (
        ('CARD', 'CARD'),
        ('UPI', 'UPI'),
        ('NETBANKING', 'NETBANKING'),
    )

    tenant = models.ForeignKey(
        'tenants.Tenant',
        on_delete=models.CASCADE
    )

    subscription = models.ForeignKey(
        'subscriptions.Subscription',
        on_delete=models.CASCADE
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    invoice_number = models.CharField(
    max_length=100,
    unique=True,
    default=''
    )
    transaction_id = models.CharField(
    max_length=255,
    unique=True,
    default=''
    )

    payment_method = models.CharField(
    max_length=50,
    choices=PAYMENT_METHODS,
    default='UPI'
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='SUCCESS'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.invoice_number