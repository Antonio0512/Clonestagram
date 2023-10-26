from django.contrib.auth.models import AbstractUser
from django.db import models
from .validators import email_validator, username_length_validator, username_regex_validator

class UserProfile(AbstractUser):
    username = models.CharField(unique=True, max_length=50, validators=[username_regex_validator, username_length_validator])
    email = models.CharField(unique=True, max_length=50, validators=[email_validator])
    image = models.ImageField(upload_to="profile_pics/", null=True, blank=True)
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    bio = models.CharField(max_length=300, null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    url = models.URLField(max_length=200, null=True, blank=True)

    followers = models.ManyToManyField('self', related_name='following', symmetrical=False, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["username"]
    
    def follow(self, user):
        """
        Add a user to the followers list.
        """
        self.followers.add(user)

    def unfollow(self, user):
        """
        Remove a user from the followers list.
        """
        self.followers.remove(user)

    def is_following(self, user):
        """
        Check if the current user is following the specified user.
        """
        return user in self.followers.all()
    
    def is_followed_by(self, user):
        """
        Check if the current user is followed by the specified user.
        """
        return user in self.followers.all()

    def __str__(self):
        return self.email
