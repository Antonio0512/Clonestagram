import re
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model


def username_regex_validator(value):
    if not re.match(r'^[a-zA-Z0-9_]*$', value):
        raise ValidationError("Username must only contain letters, numbers, and underscores")

    return value


def username_length_validator(value):
    if not len(value) >= 6:
        raise ValidationError("Username must be at least 6 characters long")
 
    return value


def email_validator(value):
    if not re.match(r'^[\w.-]+@[\w.-]+\.\w+', value):
        raise ValidationError("Invalid email address format")

    return value
    

def password_validator(password):
    if len(password) < 8:
        raise ValidationError("Password must be at least 8 characters")

    return password        