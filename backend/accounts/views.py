from rest_framework import generics
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User

from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

from .models import User

from .serializers import (
    RegisterSerializer,
    UserSerializer,
    CustomTokenObtainPairSerializer
)

from .permissions import IsAdminRole


class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()

    serializer_class = RegisterSerializer


class UserListView(generics.ListAPIView):

    queryset = User.objects.all()

    serializer_class = UserSerializer

    permission_classes = [IsAdminRole]


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()

    serializer_class = UserSerializer

    permission_classes = [
        IsAuthenticated
    ]


class CustomLoginView(
    TokenObtainPairView
):

    serializer_class = (
        CustomTokenObtainPairSerializer
    )

    
@api_view(["POST"])
def forgot_password(request):

    email = request.data.get("email")

    try:

        user = User.objects.get(email=email)

        send_mail(
            "Password Reset Request",
            f"Hello {user.username},\n\nA password reset was requested for your account.",
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )

        return Response({
            "message": "Reset email sent successfully"
        })

    except User.DoesNotExist:

        return Response(
            {
                "error": "Email not found"
            },
            status=404
        )