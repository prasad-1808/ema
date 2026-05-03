from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import User
from .serializers import UserSerializer


class BaseModelViewSet(viewsets.ModelViewSet):
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Deleted successfully"}, status=status.HTTP_200_OK)


class UserViewSet(BaseModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = User.objects.all().order_by("-created_at")
        email = self.request.query_params.get("user_email")
        if email:
            qs = qs.filter(user_email__iexact=email)
        return qs
