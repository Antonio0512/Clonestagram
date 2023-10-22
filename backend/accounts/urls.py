from django.urls import path
from .views import UserRegisterApiView, UserLoginApiView

urlpatterns = [
    path("register", UserRegisterApiView.as_view(), name="register"),
    path("login", UserLoginApiView.as_view(), name="login")
]
