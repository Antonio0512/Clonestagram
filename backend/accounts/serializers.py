from django.contrib.auth import get_user_model
from rest_framework import serializers as rest_serializers
from rest_framework.serializers import ModelSerializer
from .validators import username_validator, email_validator

User = get_user_model()


class UserRegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    @staticmethod
    def validate_username(username):
        username_validator(username)

        if User.objects.filter(username=username).exists():
            raise rest_serializers.ValidationError("This username is already in use.")
        return username

    @staticmethod
    def validate_email(email):
        email_validator(email)

        if User.objects.filter(email=email).exists():
            raise rest_serializers.ValidationError("This email is already in use.")
        return email


class UserLoginSerializer(rest_serializers.Serializer):
    email = rest_serializers.CharField()
    password = rest_serializers.CharField(write_only=True)

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass
