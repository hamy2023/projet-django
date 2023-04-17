# Generated by Django 4.1.7 on 2023-04-03 10:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("learningpath_management", "0001_initial"),
        ("challenge_management", "0001_initial"),
        ("accounts", "0001_initial"),
    ]

    operations = [
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
                ("name", models.CharField(default="", max_length=255)),
                ("description", models.TextField()),
                ("is_standalone", models.BooleanField(default=False)),
                (
                    "learningpath",
                    models.ManyToManyField(
                        blank=True,
                        related_name="gamified_courses",
                        to="learningpath_management.learningpath",
                    ),
                ),
                (
                    "participants",
                    models.ManyToManyField(
                        related_name="participated_gamifiedcourses",
                        to="accounts.developer",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Section",
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
            ],
        ),
        migrations.CreateModel(
            name="GamifiedCourseContent",
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
                    "challenges",
                    models.ManyToManyField(
                        blank=True,
                        related_name="gamified_courses",
                        to="challenge_management.challenge",
                    ),
                ),
                (
                    "gamified_course",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="content",
                        to="gamifiedcourse_management.gamifiedcourse",
                    ),
                ),
                (
                    "instructor",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="instructor_courses",
                        to="accounts.instructor",
                    ),
                ),
                (
                    "tools",
                    models.ManyToManyField(
                        blank=True,
                        related_name="gamified_courses",
                        to="challenge_management.tool",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="gamifiedcourse",
            name="sections",
            field=models.ManyToManyField(
                related_name="gamified_courses", to="gamifiedcourse_management.section"
            ),
        ),
    ]