# Generated by Django 4.1.7 on 2023-04-03 10:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("accounts", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Challenge",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(default="", max_length=255)),
                (
                    "category",
                    models.CharField(
                        choices=[
                            ("Normal challenge", "Type 1"),
                            ("Job challenge", "Type 2"),
                            ("Course challenge", "Type 3"),
                        ],
                        default="Normal challenge",
                        max_length=20,
                    ),
                ),
                (
                    "type",
                    models.CharField(
                        choices=[
                            ("Team challenge", "Team"),
                            ("Individual challenge", "Individual"),
                        ],
                        default="Individual challenge",
                        max_length=20,
                    ),
                ),
                ("topic", models.CharField(default="", max_length=255)),
                (
                    "difficulty_level",
                    models.CharField(
                        choices=[
                            ("1 star", "Level 1"),
                            ("2 star", "Level 2"),
                            ("3 star", "Level 3"),
                            ("4 star", "Level 4"),
                            ("5 star", "Level 5"),
                        ],
                        default="1 star",
                        max_length=10,
                    ),
                ),
                ("description", models.TextField(default="")),
                ("haveGrader", models.BooleanField(default=False)),
                ("isPlanned", models.BooleanField(default=False)),
                ("start_date", models.DateTimeField()),
                ("end_date", models.DateTimeField()),
                ("solution", models.TextField(default="")),
                (
                    "created_by",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="created_challenges",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "evaluated_by",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="evaluated_challenges",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "participants",
                    models.ManyToManyField(
                        related_name="participated_challenges", to="accounts.developer"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="ChallengeSubmission",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("submission", models.TextField()),
                (
                    "challenge",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="submissions",
                        to="challenge_management.challenge",
                    ),
                ),
                (
                    "participant",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="submissions",
                        to="accounts.developer",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Tool",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="Evaluation",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("grade", models.FloatField()),
                ("feedback", models.TextField(blank=True)),
                (
                    "challenge",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="evaluations",
                        to="challenge_management.challenge",
                    ),
                ),
                (
                    "participant",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="evaluations",
                        to="accounts.developer",
                    ),
                ),
                (
                    "submission",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="evaluations",
                        to="challenge_management.challengesubmission",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="BankOfChallenges",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=200)),
                ("description", models.TextField()),
                ("points", models.PositiveIntegerField(default=0)),
                (
                    "challenge",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="challenge_management.challenge",
                    ),
                ),
                (
                    "tools",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="challenge_management.tool",
                    ),
                ),
            ],
        ),
    ]
