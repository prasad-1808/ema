import uuid

from django.db import models


class User(models.Model):
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_name = models.CharField(max_length=255)
    user_mobile = models.CharField(max_length=255)
    user_email = models.CharField(max_length=255, unique=True)
    user_type = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "users"

    def __str__(self):
        return f"{self.user_name} ({self.user_email})"


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


class Event(models.Model):
    event_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event_name = models.CharField(max_length=255)
    has_marriage = models.BooleanField(default=False)
    event_marriage = models.OneToOneField(
        "Marriage",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="event",
    )
    has_reception = models.BooleanField(default=False)
    event_reception = models.OneToOneField(
        "Reception",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="event",
    )
    has_engagement = models.BooleanField(default=False)
    event_engagement = models.OneToOneField(
        "Engagement",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="event",
    )

    class Meta:
        db_table = "event"

    def __str__(self):
        return self.event_name


class UserEvent(models.Model):
    user_event_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        "User",
        on_delete=models.CASCADE,
        related_name="memberships",
    )
    event = models.ForeignKey(
        "Event",
        on_delete=models.CASCADE,
        related_name="memberships",
    )
    is_admin = models.BooleanField(default=False)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "user_events"
        unique_together = ("user", "event")

    def __str__(self):
        return f"{self.user} @ {self.event}"


class Invitation(models.Model):
    invitation_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event = models.ForeignKey(
        "Event",
        on_delete=models.CASCADE,
        related_name="invitations",
    )
    name1 = models.CharField(max_length=255)
    name2 = models.CharField(max_length=255, blank=True)
    name3 = models.CharField(max_length=255, blank=True)

    class Meta:
        db_table = "invitation"

    def __str__(self):
        return f"Invitation for {self.event}: {self.name1}"
