import re
from rest_framework import serializers as rest_serializers


def username_validator(username):
    if not re.match(r'^[a-zA-Z0-9_]*$', username):
        raise rest_serializers.ValidationError("Username must only contain letters, numbers, and underscores")

    if len(username) < 6:
        raise rest_serializers.ValidationError("Password must be at least 6 characters")


def email_validator(email):
    if not re.match(r'^[\w.-]+@[\w.-]+\.\w+', email):
        raise rest_serializers.ValidationError("Invalid email address format")
