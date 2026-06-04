from django.contrib import admin
from .models import Tenant

@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = (
        "company_name",
        "domain",
        "industry",
        "status",
        "created_at"
    )
    search_fields = ("company_name", "domain")
    list_filter = ("status",)