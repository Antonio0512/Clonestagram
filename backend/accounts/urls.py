from django.urls import path
from .views import UserRegisterApiView, UserLoginApiView, UserGetSuggestedApiView, UserFollowApiView, UserFollowingStateApiView, UserUnfollowApiView

urlpatterns = [
    path("", UserRegisterApiView.as_view(), name="register"),
    path("login", UserLoginApiView.as_view(), name="login"),
    path("suggested-users", UserGetSuggestedApiView.as_view(), name="get-users"),
    path("<int:user_id>/follow/<int:target_user_id>", UserFollowApiView.as_view(), name="follow-user"),
    path("<int:user_id>/unfollow/<int:target_user_id>", UserUnfollowApiView.as_view(), name="unfollow-user"),
    path("<int:user_id>/following-state/<int:target_user_id>", UserFollowingStateApiView.as_view(), name="following-state")
]
