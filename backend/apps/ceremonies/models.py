import uuid

from django.db import models


class Marriage(models.Model):
    marriage_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    groom_name = models.CharField(max_length=255)
    bride_name = models.CharField(max_length=255)
    marriage_date = models.DateField()
    marriage_location = models.CharField(max_length=255)

    class Meta:
        db_table = "marriage"

    def __str__(self):
        return f"Marriage: {self.groom_name} & {self.bride_name}"


class Engagement(models.Model):
    engagement_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    groom_name = models.CharField(max_length=255)
    bride_name = models.CharField(max_length=255)
    engagement_date = models.DateField()
    engagement_location = models.CharField(max_length=255)

    class Meta:
        db_table = "engagement"

    def __str__(self):
        return f"Engagement: {self.groom_name} & {self.bride_name}"


class Reception(models.Model):
    reception_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    groom_name = models.CharField(max_length=255)
    bride_name = models.CharField(max_length=255)
    reception_date = models.DateField()
    reception_location = models.CharField(max_length=255)

    class Meta:
        db_table = "reception"

    def __str__(self):
        return f"Reception: {self.groom_name} & {self.bride_name}"
