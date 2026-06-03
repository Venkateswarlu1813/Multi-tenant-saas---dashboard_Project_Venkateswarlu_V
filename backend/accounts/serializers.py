from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.core.mail import send_mail
from django.conf import settings

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = [
            'id',
            'username',
            'email',
            'phone',
            'role',
            'tenant',
            'is_active',
            'created_at'
        ]

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User

        fields = [
            'id',
            'username',
            'email',
            'password',
            'phone'
        ]

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            phone=validated_data.get('phone'),
            password=validated_data['password'],
            role='USER'
        )

        send_mail( "Welcome To SaaS Platform",
        f"Hello {user.username}, Welcome!",
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
)

        return user

class CustomTokenObtainPairSerializer(
    TokenObtainPairSerializer
):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["role"] = user.role

        return token

    def validate(self, attrs):

        data = super().validate(attrs)

        data["role"] = self.user.role
        data["user_id"] = self.user.id
        data["username"] = self.user.username
        return data
    
  