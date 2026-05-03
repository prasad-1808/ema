from django.contrib import admin

from .models import Event, UserEvent, Invitation


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
