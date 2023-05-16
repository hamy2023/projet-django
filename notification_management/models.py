from datetime import timezone
from django.db import models

from accounts.models import User

# Create your models here.


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.CharField(max_length=200)
    timestamp = models.DateTimeField(default=timezone)
    read = models.BooleanField(default=False)

    def get_user_notifications(self):
        return Notification.objects.filter(user=self.user).order_by('-timestamp')

    def mark_as_read(self):
        self.read = True
        self.save()

    def mark_as_unread(self):
        self.read = False
        self.save()

    def delete_notification(self):
        self.delete()
