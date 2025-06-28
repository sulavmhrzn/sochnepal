from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import CategoryView, ReportViewSet, UpVoteView

router = DefaultRouter()
router.register("", ReportViewSet, basename="report")

urlpatterns = [
    path("categories/", CategoryView.as_view(), name="category-list"),
    path("upvotes/", UpVoteView.as_view(), name="upvotes"),
    *router.urls,
]
