from django.contrib.auth.models import AbstractUser
from django.db import models
from .validators import email_validator, username_length_validator, username_regex_validator

class UserProfile(AbstractUser):
    username = models.CharField(unique=True, max_length=50, validators=[username_regex_validator, username_length_validator])
    email = models.CharField(unique=True, max_length=50, validators=[email_validator])
    image = models.ImageField(upload_to="profile_pics/", null=True)
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    bio = models.CharField(max_length=300, null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    url = models.URLField(max_length=200, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["username"]
    
    def __str__(self):
        return self.email
