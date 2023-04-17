from django.db import models

from accounts.models import Analyst
from challenge_management.models import Challenge
# Create your models here.


class ChallengeAnalytics(models.Model):
    analyst = models.ForeignKey(Analyst, on_delete=models.PROTECT)
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE)
    num_attempts = models.IntegerField(default=0)
    num_completions = models.IntegerField(default=0)
    avg_time_to_completion = models.DurationField(null=True)

    def edit_analytics(self, num_attempts=None, num_completions=None, avg_time_to_completion=None):
        if num_attempts is not None:
            self.num_attempts = num_attempts
        if num_completions is not None:
            self.num_completions = num_completions
        if avg_time_to_completion is not None:
            self.avg_time_to_completion = avg_time_to_completion
        self.save()

    def delete_analytics(self):
        self.delete()


class Leaderboard(models.Model):
    analyst = models.ForeignKey(Analyst, on_delete=models.CASCADE)
    challenge = models.OneToOneField(Challenge, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    data = models.JSONField(default=dict)
    last_updated = models.DateTimeField(auto_now=True)

    def edit_leaderboard(self, new_name=None, new_description=None, new_data=None):
        if new_name is not None:
            self.name = new_name
        if new_description is not None:
            self.description = new_description
        if new_data is not None:
            self.data = new_data
        self.save()

    def delete_leaderboard(self):
        self.delete()
