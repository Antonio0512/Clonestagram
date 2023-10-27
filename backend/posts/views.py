from rest_framework.generics import ListAPIView
from rest_framework import permissions
from .serializers import PostSerializer
from .models import Post

class PostsGetAllApiView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Post.objects.select_related('user').all()
    

class PostsGetFollowingApiView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        logged_in_user = self.request.user

        following_users = logged_in_user.following.all()
        following_posts = Post.objects.filter(user__in=following_users).select_related('user').all()
    
        return following_posts