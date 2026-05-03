from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('<uuid:user_id>/events/', views.user_events, name='user-events'),
]
