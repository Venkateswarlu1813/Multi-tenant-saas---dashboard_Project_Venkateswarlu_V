from rest_framework.permissions import BasePermission


class IsAdminRole(BasePermission):

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role in [
                "ADMIN",
                "SUPER_ADMIN",
                "TENANT_ADMIN"
            ]
        )


# Compatibility alias
class IsAdminUserRole(IsAdminRole):
    pass


class IsUserRole(BasePermission):

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "USER"
        )