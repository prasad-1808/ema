import uuid

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("users", "0002_split_move_models_to_apps"),
        ("ceremonies", "0001_initial"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            state_operations=[
                migrations.CreateModel(
                    name="Event",
                    fields=[
                        (
                            "event_id",
                            models.UUIDField(
                                default=uuid.uuid4,
                                editable=False,
                                primary_key=True,
                                serialize=False,
                            ),
                        ),
                        ("event_name", models.CharField(max_length=255)),
                        ("has_marriage", models.BooleanField(default=False)),
                        ("has_reception", models.BooleanField(default=False)),
                        ("has_engagement", models.BooleanField(default=False)),
                        (
                            "event_engagement",
                            models.OneToOneField(
                                blank=True,
                                null=True,
                                on_delete=django.db.models.deletion.SET_NULL,
                                related_name="event",
                                to="ceremonies.engagement",
                            ),
                        ),
                        (
                            "event_marriage",
                            models.OneToOneField(
                                blank=True,
                                null=True,
                                on_delete=django.db.models.deletion.SET_NULL,
                                related_name="event",
                                to="ceremonies.marriage",
                            ),
                        ),
                        (
                            "event_reception",
                            models.OneToOneField(
                                blank=True,
                                null=True,
                                on_delete=django.db.models.deletion.SET_NULL,
                                related_name="event",
                                to="ceremonies.reception",
                            ),
                        ),
                    ],
                    options={
                        "db_table": "event",
                    },
                ),
                migrations.CreateModel(
                    name="Invitation",
                    fields=[
                        (
                            "invitation_id",
                            models.UUIDField(
                                default=uuid.uuid4,
                                editable=False,
                                primary_key=True,
                                serialize=False,
                            ),
                        ),
                        ("name1", models.CharField(max_length=255)),
                        ("name2", models.CharField(blank=True, max_length=255)),
                        ("name3", models.CharField(blank=True, max_length=255)),
                        (
                            "event",
                            models.ForeignKey(
                                on_delete=django.db.models.deletion.CASCADE,
                                related_name="invitations",
                                to="events.event",
                            ),
                        ),
                    ],
                    options={
                        "db_table": "invitation",
                    },
                ),
                migrations.CreateModel(
                    name="UserEvent",
                    fields=[
                        (
                            "user_event_id",
                            models.UUIDField(
                                default=uuid.uuid4,
                                editable=False,
                                primary_key=True,
                                serialize=False,
                            ),
                        ),
                        ("is_admin", models.BooleanField(default=False)),
                        ("joined_at", models.DateTimeField(auto_now_add=True)),
                        (
                            "event",
                            models.ForeignKey(
                                on_delete=django.db.models.deletion.CASCADE,
                                related_name="memberships",
                                to="events.event",
                            ),
                        ),
                        (
                            "user",
                            models.ForeignKey(
                                on_delete=django.db.models.deletion.CASCADE,
                                related_name="memberships",
                                to="users.user",
                            ),
                        ),
                    ],
                    options={
                        "db_table": "user_events",
                        "unique_together": {("user", "event")},
                    },
                ),
            ],
            database_operations=[],
        ),
    ]
