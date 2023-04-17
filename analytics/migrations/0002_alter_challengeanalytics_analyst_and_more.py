# Generated by Django 4.1.7 on 2023-04-10 14:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0003_delete_badge"),
        ("challenge_management", "0003_remove_bankofchallenges_challenge_and_more"),
        ("analytics", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="challengeanalytics",
            name="analyst",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT, to="accounts.analyst"
            ),
        ),
        migrations.AlterField(
            model_name="leaderboard",
            name="challenge",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                to="challenge_management.challenge",
            ),
        ),
    ]