from django.urls import path
from .views import UserRegisterApiView, UserLoginApiView, UserGetSuggestedApiView

urlpatterns = [
    path("register", UserRegisterApiView.as_view(), name="register"),
    path("login", UserLoginApiView.as_view(), name="login"),
    path("suggested-users", UserGetSuggestedApiView.as_view(), name="get-users")
]
