from apps.users.models import User

# Create admin user
admin_user = User(user_email='admin@admin.com')
admin_user.set_password('admin')
admin_user.save()

print(f"Admin user created: {admin_user.user_email}")
