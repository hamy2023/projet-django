from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.


class User(AbstractUser):
    email = models.EmailField(unique=True)


class Profile(models.Model):
    phone = models.CharField(max_length=255)
    birth_date = models.DateField(null=True)
    bio = models.TextField(blank=True, null=True)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)

    def update_bio(self, new_bio):
        self.bio = new_bio
        self.save()

    def update_phone(self, new_phone):
        self.phone = new_phone
        self.save()

    def update_birth_date(self, new_birth_date):
        self.birth_date = new_birth_date
        self.save()


class Admin(User):

    def __str__(self):
        return self.user.email


class Developer(User):
    eggs = models.IntegerField(default=0)
    pycoins = models.IntegerField(default=0)
    lives = models.IntegerField(default=3)

    def __str__(self):
        return self.user.email

    def add_eggs(self, amount):
        self.eggs += amount

    def spend_pycoins(self, amount):
        if self.pycoins >= amount:
            self.pycoins -= amount
            return True
        else:
            return False

    def lose_life(self):
        self.lives -= 1


class Instructor(User):

    def __str__(self):
        return self.user.email

    def get_user_challenges(self):
        return self.user.challenges_set.all()

    def get_user_gamifiedcourses(self):
        return self.user.gamifiedcourses_set.all()


class Recruiter(User):

    def __str__(self):
        return self.user.email

    def get_user_interviews(self):
        return self.user.interviews_set.all()

    def get_user_jobs(self):
        return self.user.jobs_set.all()

    def get_user_challenges(self):
        return self.user.challenges_set.all()


class Analyst(User):

    def __str__(self):
        return self.user.email
