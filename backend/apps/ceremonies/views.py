from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import Marriage, Engagement, Reception
from .serializers import MarriageSerializer, EngagementSerializer, ReceptionSerializer


class BaseModelViewSet(viewsets.ModelViewSet):
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Deleted successfully"}, status=status.HTTP_200_OK)


class MarriageViewSet(BaseModelViewSet):
    queryset = Marriage.objects.all().order_by("-marriage_date")
    serializer_class = MarriageSerializer
    permission_classes = [AllowAny]


class EngagementViewSet(BaseModelViewSet):
    queryset = Engagement.objects.all().order_by("-engagement_date")
    serializer_class = EngagementSerializer
    permission_classes = [AllowAny]


class ReceptionViewSet(BaseModelViewSet):
    queryset = Reception.objects.all().order_by("-reception_date")
    serializer_class = ReceptionSerializer
    permission_classes = [AllowAny]
