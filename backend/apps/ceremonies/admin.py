from django.contrib import admin

from .models import Marriage, Engagement, Reception


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
