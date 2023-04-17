# Generated by Django 4.1.7 on 2023-04-10 14:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0002_remove_developer_badges"),
        ("recommendation", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="recommendation",
            name="developer",
            field=models.ForeignKey(
                default="",
                on_delete=django.db.models.deletion.CASCADE,
                to="accounts.developer",
            ),
        ),
    ]
