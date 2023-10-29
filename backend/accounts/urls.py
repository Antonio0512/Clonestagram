from django.urls import path
from .views import UserRegisterApiView, UserLoginApiView, UserGetSuggestedApiView, UserFollowUnfollowApiView, UserGetFollowedApiView, UserLikeOrDislikePost

urlpatterns = [
    path("", UserRegisterApiView.as_view(), name="register"),
    path("login", UserLoginApiView.as_view(), name="login"),
    path("suggested-users", UserGetSuggestedApiView.as_view(), name="get-suggested-users"),
    path("followed-users", UserGetFollowedApiView.as_view(), name="get-followed-users"),
    path("<int:user_id>/follow-unfollow/<int:target_user_id>", UserFollowUnfollowApiView.as_view(), name="follow-user"),
    path("<int:user_id>/like-dislike/<int:post_id>", UserLikeOrDislikePost.as_view(), name="like-post")
]
