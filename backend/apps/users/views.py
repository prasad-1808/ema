from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import User, UserEvent
from .serializers import LoginSerializer, UserSerializer, UserEventReadSerializer


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    email = serializer.validated_data["email"]

    try:
        user = User.objects.get(user_email=email)
    except User.DoesNotExist:
        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    user_data = UserSerializer(user).data
    return Response(
        {"message": "Login successful", "user": user_data},
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
@permission_classes([AllowAny])
def user_events(request, user_id):
    try:
        user = User.objects.get(user_id=user_id)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    memberships = UserEvent.objects.filter(user=user).select_related("event").order_by(
        "joined_at"
    )
    serializer = UserEventReadSerializer(memberships, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
