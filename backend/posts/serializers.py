from rest_framework.serializers import ModelSerializer, SerializerMethodField
from django.contrib.auth import get_user_model
from django.utils import timezone
from .models import Post, Like, Comment


User = get_user_model()

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email') 


class CommentSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        fields = ("id", "user", "text", "timestamp")


class PostSerializer(ModelSerializer):
    user = SerializerMethodField() 
    comments = SerializerMethodField()

    created_at = SerializerMethodField()
    liked = SerializerMethodField()


    class Meta:
        model = Post
        fields = ('id', 'user', 'caption', 'image', 'likes', 'comments', 'created_at', 'liked')

    def get_user(self, obj):
        user = obj.user
        user_serializer = UserSerializer(user)
        return user_serializer.data


    def get_comments(self, obj):
        comments_queryset = Comment.objects.filter(post=obj)
        comments_serializer = CommentSerializer(comments_queryset, many=True)
        return comments_serializer.data


    def get_created_at(self, obj):
        now = timezone.now()
        time_difference = now - obj.created_at

        days = time_difference.days

        if days > 7:
            formatted_created_at = obj.created_at.strftime("%B %d, %Y")
            return formatted_created_at

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