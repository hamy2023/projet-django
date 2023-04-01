# Generated by Django 4.1.7 on 2023-04-01 10:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Badge",
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
                ("name", models.CharField(max_length=50)),
                ("description", models.TextField()),
                ("image", models.ImageField(upload_to="badges/")),
                ("point_value", models.IntegerField()),
                (
                    "badge_type",
                    models.CharField(
                        choices=[
                            ("BA", "Barbados"),
                            ("TS", "Thread snake"),
                            ("RN", "Rigneck"),
                            ("VP", "Viper"),
                            ("BM", "Black mamba"),
                            ("CO", "Cobra"),
                            ("PY", "Python"),
                            ("AN", "Anaconda"),
                            ("TB", "Titanoboa"),
                        ],
                        default="BA",
                        max_length=2,
                    ),
                ),
            ],
        ),
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
                ("name", models.CharField(max_length=255)),
                ("description", models.TextField()),
                ("start_date", models.DateTimeField()),
                ("end_date", models.DateTimeField()),
                ("reward_points", models.IntegerField()),
                ("is_active", models.BooleanField(default=True)),
                (
                    "created_by",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="created_challenges",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "participants",
                    models.ManyToManyField(
                        related_name="challenges", to=settings.AUTH_USER_MODEL
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="GamifiedCourse",
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
                ("title", models.CharField(max_length=200)),
                ("description", models.TextField()),
                ("start_date", models.DateField()),
                ("end_date", models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name="Interview",
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
                (
                    "scheduled_date",
                    models.DateTimeField(default=django.utils.timezone.now),
                ),
                ("interview_type", models.CharField(max_length=100)),
                ("feedback", models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name="Job",
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
                ("title", models.CharField(max_length=255)),
                ("description", models.TextField()),
                ("salary", models.DecimalField(decimal_places=2, max_digits=10)),
                ("requirements", models.TextField()),
                ("location", models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name="LearningPath",
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
                ("title", models.CharField(max_length=100)),
                ("description", models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name="Profile",
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
                ("phone", models.CharField(max_length=255)),
                ("birth_date", models.DateField(null=True)),
                ("bio", models.TextField(blank=True, null=True)),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Recruiter",
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
                ("challenges", models.ManyToManyField(to="app.challenge")),
                (
                    "interviews",
                    models.ManyToManyField(
                        related_name="recruiters", to="app.interview"
                    ),
                ),
                ("jobs", models.ManyToManyField(to="app.job")),
                (
                    "profile",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE, to="app.profile"
                    ),
                ),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Notification",
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
                ("message", models.CharField(max_length=200)),
                ("timestamp", models.DateTimeField(default=django.utils.timezone.now)),
                ("read", models.BooleanField(default=False)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Instructor",
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
                ("challenges", models.ManyToManyField(to="app.challenge")),
                ("courses", models.ManyToManyField(to="app.gamifiedcourse")),
                (
                    "profile",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE, to="app.profile"
                    ),
                ),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="gamifiedcourse",
            name="learning_path",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="app.learningpath"
            ),
        ),
        migrations.CreateModel(
            name="Gamification",
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
                ("description", models.TextField()),
                ("points", models.IntegerField()),
                ("currency", models.CharField(max_length=50)),
                ("life_system", models.IntegerField()),
                ("badges", models.ManyToManyField(to="app.badge")),
            ],
        ),
        migrations.CreateModel(
            name="Developer",
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
                ("points", models.IntegerField(default=0)),
                ("virtual_currency", models.IntegerField(default=0)),
                ("life", models.IntegerField(default=3)),
                ("badges", models.ManyToManyField(to="app.badge")),
                ("challenges", models.ManyToManyField(blank=True, to="app.challenge")),
                (
                    "gamified_courses",
                    models.ManyToManyField(blank=True, to="app.gamifiedcourse"),
                ),
                (
                    "interviews",
                    models.ManyToManyField(
                        blank=True, related_name="interviewees", to="app.interview"
                    ),
                ),
                ("jobs", models.ManyToManyField(blank=True, to="app.job")),
                (
                    "learning_paths",
                    models.ManyToManyField(blank=True, to="app.learningpath"),
                ),
                (
                    "notifications",
                    models.ManyToManyField(blank=True, to="app.notification"),
                ),
                (
                    "profile",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE, to="app.profile"
                    ),
                ),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Analyst",
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
                (
                    "profile",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE, to="app.profile"
                    ),
                ),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
