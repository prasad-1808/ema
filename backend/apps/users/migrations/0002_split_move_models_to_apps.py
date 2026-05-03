from django.db import migrations


class Migration(migrations.Migration):
    """
    Remove ceremony/event models from the users app migration state only.
    Tables are unchanged; ceremonies and events apps adopt the same db_table names.
    """

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            state_operations=[
                migrations.DeleteModel(name="Invitation"),
                migrations.DeleteModel(name="UserEvent"),
                migrations.DeleteModel(name="Event"),
                migrations.DeleteModel(name="Engagement"),
                migrations.DeleteModel(name="Reception"),
                migrations.DeleteModel(name="Marriage"),
            ],
            database_operations=[],
        ),
    ]
