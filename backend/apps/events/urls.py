from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    EventViewSet,
    UserEventViewSet,
    InvitationViewSet,
    UserEventsAPIView,
    EventAdminsAPIView,
    EventMembersAPIView,
    EventInvitationsAPIView,
)

router = DefaultRouter()
router.register("events", EventViewSet, basename="events")
router.register("user-events", UserEventViewSet, basename="user-events")
router.register("invitations", InvitationViewSet, basename="invitations")

urlpatterns = [
    path("users/<uuid:user_id>/events/", UserEventsAPIView.as_view(), name="user-events-list"),
    path("events/<uuid:event_id>/admins/", EventAdminsAPIView.as_view(), name="event-admins"),
    path("events/<uuid:event_id>/members/", EventMembersAPIView.as_view(), name="event-members"),
    path(
        "events/<uuid:event_id>/invitations/",
        EventInvitationsAPIView.as_view(),
        name="event-invitations",
    ),
]

urlpatterns += router.urls
