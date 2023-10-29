from rest_framework.serializers import ModelSerializer, SerializerMethodField
from django.contrib.auth import get_user_model
from django.utils import timezone
from .models import Post, Like

User = get_user_model()

class UserSerializer(ModelSerializer):
    class Meta:
        model = User 
        fields = ['id', 'username', 'email'] 

class PostSerializer(ModelSerializer):
    user = UserSerializer() 

    time_since_posted = SerializerMethodField()
    liked = SerializerMethodField()


    class Meta:
        model = Post
        fields = ('id', 'user', 'caption', 'image', 'created_at', 'time_since_posted', 'likes', 'comments', 'liked')

    def get_time_since_posted(self, obj):
        now = timezone.now()
        time_difference = now - obj.created_at

        days = time_difference.days
        seconds = time_difference.seconds
        hours, remainder = divmod(seconds, 3600)
        minutes, seconds = divmod(remainder, 60)

        if days > 0:
            return f"{days} days ago"
        elif hours > 0:
            return f"{hours} hours ago"
        elif minutes > 0:
            return f"{minutes} minutes ago"
        else:
            return "Just now"
        
    def get_liked(self, obj):
            user = self.context['request'].user
            return Like.objects.filter(user=user, post=obj).exists()