from rest_framework.routers import DefaultRouter

from .views import MarriageViewSet, EngagementViewSet, ReceptionViewSet

router = DefaultRouter()
router.register("marriages", MarriageViewSet, basename="marriages")
router.register("engagements", EngagementViewSet, basename="engagements")
router.register("receptions", ReceptionViewSet, basename="receptions")

urlpatterns = router.urls
