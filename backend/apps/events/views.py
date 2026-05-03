from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.users.models import User

from .models import Event, UserEvent, Invitation
from .serializers import (
    UserSerializer,
    EventSerializer,
    UserEventSerializer,
    InvitationSerializer,
)


class BaseModelViewSet(viewsets.ModelViewSet):
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Deleted successfully"}, status=status.HTTP_200_OK)


class EventViewSet(BaseModelViewSet):
    queryset = Event.objects.all().order_by("event_name")
    serializer_class = EventSerializer
    permission_classes = [AllowAny]


class UserEventViewSet(BaseModelViewSet):
    queryset = UserEvent.objects.select_related("user", "event").all().order_by("-joined_at")
    serializer_class = UserEventSerializer
    permission_classes = [AllowAny]
    http_method_names = ["get", "post", "patch", "delete", "head", "options"]


class InvitationViewSet(BaseModelViewSet):
    queryset = Invitation.objects.select_related("event").all().order_by("name1")
    serializer_class = InvitationSerializer
    permission_classes = [AllowAny]


class UserEventsAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, user_id):
        user = get_object_or_404(User, user_id=user_id)
        memberships = (
            UserEvent.objects.filter(user=user)
            .select_related(
                "event",
                "event__event_marriage",
                "event__event_reception",
                "event__event_engagement",
            )
            .order_by("-joined_at")
        )
        response_data = []
        for membership in memberships:
            response_data.append(
                {
                    "user_event_id": membership.user_event_id,
                    "is_admin": membership.is_admin,
                    "joined_at": membership.joined_at,
                    "event": EventSerializer(membership.event).data,
                }
            )
        return Response(response_data, status=status.HTTP_200_OK)


class EventAdminsAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, event_id):
        event = get_object_or_404(Event, event_id=event_id)
        admin_memberships = UserEvent.objects.filter(event=event, is_admin=True).select_related(
            "user"
        )
        users = [membership.user for membership in admin_memberships]
        data = UserSerializer(users, many=True).data
        return Response(data, status=status.HTTP_200_OK)


class EventMembersAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, event_id):
        event = get_object_or_404(Event, event_id=event_id)
        memberships = UserEvent.objects.filter(event=event).select_related("user").order_by(
            "-joined_at"
        )
        response_data = []
        for membership in memberships:
            response_data.append(
                {
                    "user_event_id": membership.user_event_id,
                    "is_admin": membership.is_admin,
                    "joined_at": membership.joined_at,
                    "user": UserSerializer(membership.user).data,
                }
            )
        return Response(response_data, status=status.HTTP_200_OK)


class EventInvitationsAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, event_id):
        event = get_object_or_404(Event, event_id=event_id)
        invitations = Invitation.objects.filter(event=event).select_related("event")
        data = InvitationSerializer(invitations, many=True).data
        return Response(data, status=status.HTTP_200_OK)
