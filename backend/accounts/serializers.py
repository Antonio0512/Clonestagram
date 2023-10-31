from django.contrib.auth import get_user_model
from rest_framework import serializers
from .validators import password_validator
from posts.models import Comment, Post
from posts.serializers import PostSerializer

User = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        password = data.get('password')
        password_validator(password)

        return data
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
            )
    
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'image', 'bio', 'location', 'url')



class UserProfileWithPostsSerializer(serializers.ModelSerializer):
    posts = serializers.SerializerMethodField()
    is_followed = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'image', 'bio', 'location', 'url', 'posts', 'is_followed')

    def get_posts(self, obj):
        user_posts = Post.objects.filter(user=obj)
        posts_serializer = PostSerializer(user_posts, many=True, context=self.context)
        return posts_serializer.data
    
    def get_is_followed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return request.user.is_following(obj)
        return False


class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"