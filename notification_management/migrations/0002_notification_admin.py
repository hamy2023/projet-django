# Generated by Django 4.1.7 on 2023-04-04 14:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0001_initial"),
        ("notification_management", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="notification",
            name="admin",
            field=models.ManyToManyField(related_name="admin", to="accounts.admin"),
        ),
    ]
