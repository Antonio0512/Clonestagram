from django.contrib.auth import get_user_model, authenticate
from django.shortcuts import get_object_or_404

from rest_framework import status, permissions
from rest_framework.authtoken.models import Token

from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import UserRegisterSerializer, UserLoginSerializer, UserProfileWithPostsSerializer, CommentCreateSerializer, UserProfileSerializer
from posts.serializers import CommentSerializer

from posts.models import Post, Like

User = get_user_model()


class UserRegisterApiView(CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserRegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserLoginApiView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]

            user = authenticate(request, email=email, password=password)

            if user:
                token, _ = Token.objects.get_or_create(user=user)

                user_data = UserProfileWithPostsSerializer(user).data

                response_data = {
                    'user': user_data,
                    'token': token.key
                }

                return Response(response_data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Email and password do not match'},
                                status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserGetSuggestedApiView(ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        logged_in_user = self.request.user

        suggested_users = User.objects.exclude(id=logged_in_user.id)[:100]
        return [user for user in suggested_users if not logged_in_user.is_following(user)]


class UserGetFollowedApiView(ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        logged_in_user = self.request.user
        return logged_in_user.following.all()
    



class UserFollowUnfollowApiView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, user_id, target_user_id):
        user = get_object_or_404(User, id=user_id)
        target_user = get_object_or_404(User, id=target_user_id)

        if user.is_following(target_user):
            return Response({'error': f"You are already following {target_user.username}"}, status=status.HTTP_400_BAD_REQUEST)

        user.follow(target_user)
        return Response({'success': 'User followed successfully'}, status=status.HTTP_201_CREATED)

    def delete(self, request, user_id, target_user_id):
        user = get_object_or_404(User, id=user_id)
        target_user = get_object_or_404(User, id=target_user_id)

        if not user.is_following(target_user):
            return Response({'error': f"You are not following {target_user.username}"}, status=status.HTTP_400_BAD_REQUEST)

        user.unfollow(target_user)
        return Response({'success': 'User unfollowed successfully'}, status=status.HTTP_200_OK)
    


class UserLikeOrDislikePostApiView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, user_id, post_id):
        user = get_object_or_404(User, id=user_id)
        post = get_object_or_404(Post, id=post_id)

        if Like.objects.filter(user=user, post=post).exists():
            return Response({'error': 'You have already liked this post'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            Like.objects.create(user=user, post=post)
            return Response({'success': 'Post liked successfully'}, status=status.HTTP_201_CREATED)

    def delete(self, request, user_id, post_id):
        user = get_object_or_404(User, id=user_id)
        post = get_object_or_404(Post, id=post_id)
        try:
            like = Like.objects.get(user=user, post=post)
            like.delete()
            return Response({'success': 'Post unliked successfully'}, status=status.HTTP_200_OK)
        except Like.DoesNotExist:
            return Response({'error': 'You have not liked this post'}, status=status.HTTP_400_BAD_REQUEST)
        

class UserCommentPostApiView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, user_id, post_id):
        user = get_object_or_404(User, id=user_id)
        post = get_object_or_404(Post, id=post_id)

        comment_data = request.data
        comment_data['user'] = user.id
        comment_data['post'] = post.id
    
        serializer = CommentCreateSerializer(data=comment_data)

        if serializer.is_valid():
            comment = serializer.save()   
            comment_serializer = CommentSerializer(comment) 
            return Response(comment_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class UserGetByIdApiView(RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserProfileWithPostsSerializer

    def get_object(self):
        user_id = self.kwargs.get("user_id")
        return get_object_or_404(User, id=user_id)