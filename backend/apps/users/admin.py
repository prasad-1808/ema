from django.contrib import admin

from .models import (
    User,
    Marriage,
    Engagement,
    Reception,
    Event,
    UserEvent,
    Invitation,
)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("user_id", "user_name", "user_email", "user_type", "created_at")
    search_fields = ("user_name", "user_email", "user_mobile")
    readonly_fields = ("user_id", "created_at")


@admin.register(Marriage)
class MarriageAdmin(admin.ModelAdmin):
    list_display = ("marriage_id", "groom_name", "bride_name", "marriage_date", "marriage_location")
    readonly_fields = ("marriage_id",)


@admin.register(Engagement)
class EngagementAdmin(admin.ModelAdmin):
    list_display = (
        "engagement_id",
        "groom_name",
        "bride_name",
        "engagement_date",
        "engagement_location",
    )
    readonly_fields = ("engagement_id",)


@admin.register(Reception)
class ReceptionAdmin(admin.ModelAdmin):
    list_display = (
        "reception_id",
        "groom_name",
        "bride_name",
        "reception_date",
        "reception_location",
    )
    readonly_fields = ("reception_id",)


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = (
        "event_id",
        "event_name",
        "has_marriage",
        "has_reception",
        "has_engagement",
    )
    readonly_fields = ("event_id",)


@admin.register(UserEvent)
class UserEventAdmin(admin.ModelAdmin):
    list_display = ("user_event_id", "user", "event", "is_admin", "joined_at")
    readonly_fields = ("user_event_id", "joined_at")
    list_filter = ("is_admin",)


@admin.register(Invitation)
class InvitationAdmin(admin.ModelAdmin):
    list_display = ("invitation_id", "event", "name1", "name2", "name3")
    readonly_fields = ("invitation_id",)
