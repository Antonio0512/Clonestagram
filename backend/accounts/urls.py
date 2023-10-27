from django.urls import path
from .views import UserRegisterApiView, UserLoginApiView, UserGetSuggestedApiView, UserFollowApiView, UserUnfollowApiView, UserGetFollowedApiView

urlpatterns = [
    path("", UserRegisterApiView.as_view(), name="register"),
    path("login", UserLoginApiView.as_view(), name="login"),
    path("suggested-users", UserGetSuggestedApiView.as_view(), name="get-suggested-users"),
    path("followed-users", UserGetFollowedApiView.as_view(), name="get-followed-users"),
    path("<int:user_id>/follow/<int:target_user_id>", UserFollowApiView.as_view(), name="follow-user"),
    path("<int:user_id>/unfollow/<int:target_user_id>", UserUnfollowApiView.as_view(), name="unfollow-user"),
]
