from rest_framework import serializers

from .models import User, Event, UserEvent


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, required=False, allow_blank=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "user_id",
            "user_name",
            "user_mobile",
            "user_email",
            "user_type",
            "created_at",
        ]


class EventSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "event_id",
            "event_name",
            "has_marriage",
            "has_reception",
            "has_engagement",
        ]


class UserEventReadSerializer(serializers.ModelSerializer):
    event = EventSummarySerializer(read_only=True)

    class Meta:
        model = UserEvent
        fields = ["user_event_id", "event", "is_admin", "joined_at"]
