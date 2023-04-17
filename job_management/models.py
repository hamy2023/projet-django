from django.db import models
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from accounts.models import User, Developer, Recruiter
from challenge_management.models import Challenge

# Create your models here.


class JobOffer(models.Model):
    job_title = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    required_skills = models.CharField(max_length=255)
    job_description = models.TextField()
    salary = models.IntegerField()
    location = models.CharField(max_length=255)
    job_challenge = models.OneToOneField(
        Challenge, on_delete=models.CASCADE, related_name='job_offers')
    recruiter = models.ForeignKey(
        Recruiter, on_delete=models.PROTECT, related_name='recruiter',)
    participants = models.ManyToManyField(Developer)

    def get_job_title(self):
        return self.job_title

    def get_company_name(self):
        return self.company_name

    def get_required_skills(self):
        return self.required_skills.split(",")

    def get_job_description(self):
        return self.job_description

    def get_salary(self):
        return self.salary

    def get_location(self):
        return self.location

    def get_job_challenge(self):
        return self.job_challenge

    def update_job_title(self, new_title):
        self.job_title = new_title
        self.save()

    def update_company_name(self, new_company_name):
        self.company_name = new_company_name
        self.save()

    def update_required_skills(self, new_skills):
        self.required_skills = ",".join(new_skills)
        self.save()

    def update_job_description(self, new_description):
        self.job_description = new_description
        self.save()

    def update_salary(self, new_salary):
        self.salary = new_salary
        self.save()

    def update_location(self, new_location):
        self.location = new_location
        self.save()

    def update_job_challenge(self, new_challenge):
        self.job_challenge = new_challenge
        self.save()


class Interview(models.Model):
    interviewee = models.ForeignKey(
        Developer, on_delete=models.CASCADE, related_name='interviews_attended', default=1)
    interviewer = models.ForeignKey(
        Recruiter, on_delete=models.CASCADE, related_name='interviews_conducted', default=1)
    scheduled_time = models.DateTimeField(null=True, blank=True)
    questions = models.TextField()
    completed = models.BooleanField(default=False)
    completion_time = models.DateTimeField(null=True)

    def __str__(self):
        return f"Interview {self.id}: {self.interviewee.username} with {self.interviewer.username}"

    def get_interviewee(self):
        return self.interviewee

    def get_interviewer(self):
        return self.interviewer

    def get_challenge(self):
        return self.challenge

    def get_scheduled_time(self):
        return self.scheduled_time

    def get_questions(self):
        return self.questions

    def is_completed(self):
        return self.completed

    def mark_as_completed(self):
        self.completed = True
        self.completion_time = timezone.now()
        self.save()

    def get_duration(self):
        if not self.completed:
            return None
        return self.completion_time - self.scheduled_time
