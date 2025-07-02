from rest_framework_nested import routers

from apps.reports.urls import router as ReportRouter

from .views import CommentViewSet

router = routers.NestedDefaultRouter(ReportRouter, "", lookup="report")

router.register(prefix="comments", viewset=CommentViewSet)


urlpatterns = [*router.urls]
