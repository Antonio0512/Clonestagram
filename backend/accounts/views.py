from django.contrib.auth import get_user_model, authenticate

from rest_framework import status, permissions
from rest_framework.authtoken.models import Token

from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserRegisterSerializer, UserLoginSerializer, UserProfileSerializer

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

                user_data = UserProfileSerializer(user).data

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

        followed_users = User.objects.all()
        return [user for user in followed_users if logged_in_user.is_following(user)]



class UserFollowApiView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, user_id, target_user_id):
        try:
            user = User.objects.get(id=user_id)
            target_user = User.objects.get(id=target_user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if user.is_following(target_user):
            return Response({'error': f"You are already following {target_user.username}"}, status=status.HTTP_400_BAD_REQUEST)

        user.follow(target_user)
        return Response({'success': 'User followed successfully'}, status=status.HTTP_201_CREATED)
    

class UserUnfollowApiView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def delete(self, request, user_id, target_user_id):
        try:
            user = User.objects.get(id=user_id)
            target_user = User.objects.get(id=target_user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if not user.is_following(target_user):
            return Response({'error': f"You are not following {target_user.username}"}, status=status.HTTP_400_BAD_REQUEST)

        user.unfollow(target_user)
        return Response({'success': 'User followed successfully'}, status=status.HTTP_200_OK)