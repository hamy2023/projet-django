from django.db import models
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from accounts.models import Admin, Developer

# Create your models here.


class LearningPath(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    participants = models.ManyToManyField(
        Developer, related_name='participated_learningpaths')
    admin = models.ForeignKey(Admin, on_delete=models.PROTECT)

    def __str__(self):
        return self.name

    def add_course(self, course):
        self.courses.add(course)

    def remove_course(self, course):
        self.courses.remove(course)

    def get_course_list(self):
        return list(self.courses.all())

    def is_empty(self):
        return self.courses.count() == 0
