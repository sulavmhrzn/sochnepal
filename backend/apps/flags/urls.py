from rest_framework.routers import DefaultRouter

from .views import FlagViewSet

router = DefaultRouter()
router.register("", FlagViewSet)

urlpatterns = [*router.urls]
