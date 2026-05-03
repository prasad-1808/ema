from rest_framework import serializers

from apps.users.models import User
from apps.users.serializers import UserSerializer
from apps.ceremonies.serializers import (
    MarriageSerializer,
    EngagementSerializer,
    ReceptionSerializer,
)
from apps.ceremonies.models import Marriage, Engagement, Reception

from .models import Event, UserEvent, Invitation


class EventSerializer(serializers.ModelSerializer):
    event_marriage = MarriageSerializer(read_only=True)
    event_reception = ReceptionSerializer(read_only=True)
    event_engagement = EngagementSerializer(read_only=True)

    event_marriage_id = serializers.PrimaryKeyRelatedField(
        source="event_marriage",
        queryset=Marriage.objects.all(),
        write_only=True,
        required=False,
        allow_null=True,
    )
    event_reception_id = serializers.PrimaryKeyRelatedField(
        source="event_reception",
        queryset=Reception.objects.all(),
        write_only=True,
        required=False,
        allow_null=True,
    )
    event_engagement_id = serializers.PrimaryKeyRelatedField(
        source="event_engagement",
        queryset=Engagement.objects.all(),
        write_only=True,
        required=False,
        allow_null=True,
    )

    class Meta:
        model = Event
        fields = [
            "event_id",
            "event_name",
            "has_marriage",
            "event_marriage",
            "event_marriage_id",
            "has_reception",
            "event_reception",
            "event_reception_id",
            "has_engagement",
            "event_engagement",
            "event_engagement_id",
        ]


class UserEventSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        source="user",
        queryset=User.objects.all(),
        write_only=True,
    )
    event_id = serializers.PrimaryKeyRelatedField(
        source="event",
        queryset=Event.objects.all(),
        write_only=True,
    )

    class Meta:
        model = UserEvent
        fields = [
            "user_event_id",
            "user",
            "event",
            "user_id",
            "event_id",
            "is_admin",
            "joined_at",
        ]
        read_only_fields = ["user_event_id", "joined_at", "event"]


class InvitationSerializer(serializers.ModelSerializer):
    event = EventSerializer(read_only=True)
    event_id = serializers.PrimaryKeyRelatedField(
        source="event",
        queryset=Event.objects.all(),
        write_only=True,
    )

    class Meta:
        model = Invitation
        fields = ["invitation_id", "event", "event_id", "name1", "name2", "name3"]
