from rest_framework.generics import ListAPIView
from rest_framework import permissions
from .serializers import PostSerializer
from .models import Post

class PostsGetAllApiView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Post.objects.select_related('user').all()