from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    user_email = models.EmailField(unique=True, max_length=255)
    user_password = models.CharField(max_length=255)

    class Meta:
        db_table = 'users'

    def set_password(self, raw_password):
        self.user_password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.user_password)
