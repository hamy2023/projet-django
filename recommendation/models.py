from django.db import models

from accounts.models import Analyst, Developer

# Create your models here.


class Recommendation(models.Model):
    analyst = models.ForeignKey(Analyst, on_delete=models.CASCADE)
    developer = models.ForeignKey(
        Developer, on_delete=models.CASCADE, default="")
    title = models.CharField(max_length=100)
    description = models.TextField()
    creation_time = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def edit_recommendation(self, new_title, new_description):
        self.title = new_title
        self.description = new_description
        self.save()

    def delete_recommendation(self):
        self.delete()
