from django.urls import path
from .views import PostsGetAllApiView

urlpatterns = [
    path("", PostsGetAllApiView.as_view(), name="get-posts")
    
]
