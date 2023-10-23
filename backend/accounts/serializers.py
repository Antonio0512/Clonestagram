from django.contrib.auth import get_user_model
from rest_framework import serializers as rest_serializers
from .validators import username_validator, email_validator

User = get_user_model()


class UserRegisterSerializer(rest_serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    @staticmethod
    def validate_username(username):
        username_validator(username)
        return username

    @staticmethod
    def validate_email(email):
        email_validator(email)
        return email


class UserLoginSerializer(rest_serializers.Serializer):
    email = rest_serializers.CharField()
    password = rest_serializers.CharField(write_only=True)

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass
