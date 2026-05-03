from django.contrib import admin

from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("user_id", "user_name", "user_email", "user_type", "created_at")
    search_fields = ("user_name", "user_email", "user_mobile")
    readonly_fields = ("user_id", "created_at")
