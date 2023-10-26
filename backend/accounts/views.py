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

        all_users = User.objects.exclude(id=logged_in_user.id)[:60]
        return [user for user in all_users if not logged_in_user.is_following(user)][:10]

