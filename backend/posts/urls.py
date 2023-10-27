from django.urls import path
from .views import PostsGetAllApiView, PostsGetFollowingApiView

urlpatterns = [
    path("", PostsGetAllApiView.as_view(), name="get-posts"),
    path("following/", PostsGetFollowingApiView.as_view(), name="get-following-posts")
]
