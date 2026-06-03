from django.urls import path

from rest_framework.routers import DefaultRouter
from .views import forgot_password

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from .views import (
    RegisterView,
    CustomLoginView,
    UserViewSet,
)

router = DefaultRouter()

router.register(
    r'users',
    UserViewSet,
    basename='users'
)

urlpatterns = [

    path(
        'register/',
        RegisterView.as_view(),
        name='register'
    ),

    path(
        'login/',
        CustomLoginView.as_view(),
        name='login'
    ),

    path(
        'refresh/',
        TokenRefreshView.as_view(),
        name='refresh'
    ),

    path(
    "forgot-password/",
    forgot_password,
    name="forgot-password"
    ),
]

urlpatterns += router.urls