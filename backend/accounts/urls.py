from django.urls import path
from .views import UserRegisterApiView, UserLoginApiView, UserGetAllApiView

urlpatterns = [
    path("register", UserRegisterApiView.as_view(), name="register"),
    path("login", UserLoginApiView.as_view(), name="login"),
    path("", UserGetAllApiView.as_view(), name="get-users")
]
