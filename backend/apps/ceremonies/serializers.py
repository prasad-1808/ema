from rest_framework import serializers

from .models import Marriage, Engagement, Reception


class MarriageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marriage
        fields = "__all__"


class EngagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Engagement
        fields = "__all__"


class ReceptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reception
        fields = "__all__"
