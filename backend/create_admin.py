import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from apps.users.models import User

user, created = User.objects.get_or_create(
    user_email="admin@admin.com",
    defaults={
        "user_name": "Admin",
        "user_mobile": "0000000000",
        "user_type": "admin",
    },
)

if created:
    print(f"Admin user created: {user.user_email} ({user.user_id})")
else:
    print(f"Admin user already exists: {user.user_email} ({user.user_id})")
