"""
API URL configuration
"""
from django.urls import path, include
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def health_check(request):
    return Response({
        'status': 'healthy',
        'message': 'Event Memory App API is running'
    })

urlpatterns = [
    path("", health_check, name="health-check"),
    path("", include("apps.users.urls")),
    path("", include("apps.ceremonies.urls")),
    path("", include("apps.events.urls")),
]
