from django.db import models
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from accounts.models import Admin, User, Developer, Instructor
from challenge_management.models import Challenge
from learningpath_management.models import LearningPath

# Create your models here.


class GamifiedCourse(models.Model):
    name = models.CharField(max_length=255, default="")
    description = models.TextField()
    is_standalone = models.BooleanField(default=False)
    learningpath = models.ForeignKey(
        LearningPath, related_name='gamified_courses', blank=True, on_delete=models.CASCADE)
    participants = models.ManyToManyField(
        Developer, related_name='participated_gamifiedcourses')
    admin = models.ForeignKey(Admin, on_delete=models.PROTECT)
    Instructor = models.ForeignKey(
        Instructor, on_delete=models.PROTECT, blank=True, related_name='gamified_courses', default="")
    challenges = models.ManyToManyField(Challenge)

    def __str__(self):
        return self.name

    def get_sections(self):

        sections = self.sections_set.all()
        return sections

    def add_sections(self, sections):

        self.section_set.add(sections)

    def remove_section(self, sections):

        self.sections_set.remove(sections)

    def get_challenges(self):

        challenges = self.challenge_set.all()
        return challenges

    def add_challenge(self, challenge):

        self.challenge_set.add(challenge)

    def remove_challenge(self, challenge):

        self.challenge_set.remove(challenge)
