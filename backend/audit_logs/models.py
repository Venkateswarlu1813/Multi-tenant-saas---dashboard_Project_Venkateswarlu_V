from django.db import models


class AuditLog(models.Model):

    ACTIONS = (
        ('LOGIN', 'LOGIN'),
        ('CREATE', 'CREATE'),
        ('UPDATE', 'UPDATE'),
        ('DELETE', 'DELETE'),
    )

    user = models.ForeignKey(
        'accounts.User',
        on_delete=models.CASCADE
    )

    action = models.CharField(
        max_length=50,
        choices=ACTIONS
    )

    description = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.user.username} - {self.action}"