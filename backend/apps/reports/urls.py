from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import CategoryView, ReportViewSet

router = DefaultRouter()
router.register("", ReportViewSet, basename="reports")

urlpatterns = [
    path("categories/", CategoryView.as_view(), name="category-list"),
    *router.urls,
]
