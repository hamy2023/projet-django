from django.db import models
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from accounts.models import User
from challenge_management.models import BankOfQuestions, Challenge, Question
from learningpath_management.models import LearningPath

# Create your models here.


class GamifiedCourse(models.Model):
    name = models.CharField(max_length=255, default="")
    description = models.TextField()
    is_standalone = models.BooleanField(default=False)
    learningpath = models.ForeignKey(
        LearningPath, related_name='gamified_courses', blank=True, null=True, on_delete=models.CASCADE)
    """     participants = models.ManyToManyField(
        Developer, related_name='participated_gamifiedcourses')
    admin = models.ForeignKey(Admin, on_delete=models.PROTECT)
    Instructor = models.ForeignKey(
        Instructor, on_delete=models.PROTECT, blank=True, related_name='gamified_courses', default="") """

    def __str__(self):
        return self.name

    def get_sections(self):

        sections = self.sections_set.all()
        return sections

    def add_sections(self, sections):

        self.section_set.add(sections)

    def remove_section(self, sections):

        self.sections_set.remove(sections)


class Section(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    course = models.ForeignKey(
        GamifiedCourse, on_delete=models.CASCADE, default='')

    def __str__(self):
        return self.name


class Subsection(models.Model):
    title = models.CharField(max_length=200)
    section = models.ForeignKey(
        Section, on_delete=models.CASCADE, default='')

    def __str__(self):
        return self.title


class Video(models.Model):
    subsection = models.ForeignKey(Subsection, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    points = models.IntegerField(default=0)
    video_file = models.FileField(upload_to='videos/')

    def __str__(self):
        return self.title

    def get_video_url(self):
        return f"{settings.MEDIA_URL}{str(self.video_file)}"

    class Meta:
        verbose_name = "Section Content Video"


class Text(models.Model):
    subsection = models.ForeignKey(Subsection, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    points = models.IntegerField(default=0)
    pdf_file = models.FileField(upload_to='pdf/')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Section Content Text"


class SectionChallenge(models.Model):
    subsection = models.ForeignKey(
        Subsection, on_delete=models.CASCADE, default='')
    title = models.CharField(max_length=200)
    content = models.TextField(default='')
    points = models.IntegerField(default=0)
    quiz = models.BooleanField(default=False)
    editor = models.BooleanField(default=False)
    vr = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Section Content Challenge"


class Content(models.Model):
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
