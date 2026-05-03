import uuid

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("users", "0002_split_move_models_to_apps"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            state_operations=[
                migrations.CreateModel(
                    name="Engagement",
                    fields=[
                        (
                            "engagement_id",
                            models.UUIDField(
                                default=uuid.uuid4,
                                editable=False,
                                primary_key=True,
                                serialize=False,
                            ),
                        ),
                        ("groom_name", models.CharField(max_length=255)),
                        ("bride_name", models.CharField(max_length=255)),
                        ("engagement_date", models.DateField()),
                        ("engagement_location", models.CharField(max_length=255)),
                    ],
                    options={
                        "db_table": "engagement",
                    },
                ),
                migrations.CreateModel(
                    name="Marriage",
                    fields=[
                        (
                            "marriage_id",
                            models.UUIDField(
                                default=uuid.uuid4,
                                editable=False,
                                primary_key=True,
                                serialize=False,
                            ),
                        ),
                        ("groom_name", models.CharField(max_length=255)),
                        ("bride_name", models.CharField(max_length=255)),
                        ("marriage_date", models.DateField()),
                        ("marriage_location", models.CharField(max_length=255)),
                    ],
                    options={
                        "db_table": "marriage",
                    },
                ),
                migrations.CreateModel(
                    name="Reception",
                    fields=[
                        (
                            "reception_id",
                            models.UUIDField(
                                default=uuid.uuid4,
                                editable=False,
                                primary_key=True,
                                serialize=False,
                            ),
                        ),
                        ("groom_name", models.CharField(max_length=255)),
                        ("bride_name", models.CharField(max_length=255)),
                        ("reception_date", models.DateField()),
                        ("reception_location", models.CharField(max_length=255)),
                    ],
                    options={
                        "db_table": "reception",
                    },
                ),
            ],
            database_operations=[],
        ),
    ]
