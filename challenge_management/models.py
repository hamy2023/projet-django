from django.db import models
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from accounts.models import Admin, Instructor, User, Developer

# Create your models here.


class BankOfQuestions(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    points = models.PositiveIntegerField(default=0)
    instructor = models.ForeignKey(
        Instructor, on_delete=models.PROTECT, default="")

    def __str__(self):
        return self.name

    def get_challenge(self):
        return self.challenge

    def get_name(self):
        return self.name

    def get_description(self):
        return self.description

    def get_points(self):
        return self.points

    def get_tool(self):
        return self.tool

    def update_name(self, name):
        self.name = name
        self.save()

    def update_description(self, description):
        self.description = description
        self.save()

    def update_points(self, points):
        self.points = points
        self.save()

    def update_tool(self, tool):
        self.tool = tool
        self.save()


class Challenge(models.Model):
    DIFFICULTY_LEVELS = (
        ('1 star', 'Level 1'),
        ('2 star', 'Level 2'),
        ('3 star', 'Level 3'),
        ('4 star', 'Level 4'),
        ('5 star', 'Level 5')
    )
    CHALLENGE_TYPES = (
        ('Team challenge', 'Team'),
        ('Individual challenge', 'Individual'),
    )
    CHALLENGE_CATEGORIES = (
        ('Normal challenge', 'Type 1'),
        ('Job challenge', 'Type 2'),
        ('Course challenge', 'Type 3')
    )
    name = models.CharField(max_length=255, default='')
    category = models.CharField(
        max_length=20, choices=CHALLENGE_CATEGORIES, default='Normal challenge')
    type = models.CharField(
        max_length=20, choices=CHALLENGE_TYPES, default='Individual challenge')
    topic = models.CharField(max_length=255, default='')
    difficulty_level = models.CharField(
        max_length=10, choices=DIFFICULTY_LEVELS, default="1 star")
    description = models.TextField(default='')
    haveGrader = models.BooleanField(default=False)
    isPlanned = models.BooleanField(default=False)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    solution = models.TextField(default='')
    participants = models.ManyToManyField(
        Developer, related_name='participated_challenges')
    created_by = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name='created_challenges')
    evaluated_by = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name='evaluated_challenges', default="")
    admin = models.ForeignKey(Admin, on_delete=models.PROTECT, default="")
    BankOfQuestions = models.ForeignKey(
        BankOfQuestions, on_delete=models.CASCADE, default="")

    def __str__(self):
        return self.name

    def get_name(self):
        return self.name

    def get_category(self):
        return self.category

    def get_type(self):
        return self.type

    def get_topic(self):
        return self.topic

    def get_difficulty_level(self):
        return self.difficulty_level

    def get_description(self):
        return self.description

    def get_haveGrader(self):
        return self.haveGrader

    def get_isPlanned(self):
        return self.isPlanned

    def get_start_date(self):
        return self.start_date

    def get_end_date(self):
        return self.end_date

    def get_solution(self):
        return self.solution

    def get_participants(self):
        return self.participants.all()

    def get_created_by(self):
        return self.created_by

    def update_name(self, name):
        self.name = name
        self.save()

    def update_category(self, category):
        self.category = category
        self.save()

    def update_type(self, type):
        self.type = type
        self.save()

    def update_topic(self, topic):
        self.topic = topic
        self.save()

    def update_difficulty_level(self, difficulty_level):
        self.difficulty_level = difficulty_level
        self.save()

    def update_description(self, description):
        self.description = description
        self.save()

    def update_haveGrader(self, haveGrader):
        self.haveGrader = haveGrader
        self.save()

    def update_isPlanned(self, isPlanned):
        self.isPlanned = isPlanned
        self.save()

    def update_start_date(self, start_date):
        self.start_date = start_date
        self.save()

    def update_end_date(self, end_date):
        self.end_date = end_date
        self.save()

    def update_solution(self, solution):
        self.solution = solution
        self.save()

    def add_participant(self, user):
        self.participants.add(user)

    def remove_participant(self, user):
        self.participants.remove(user)


class ChallengeSubmission(models.Model):
    challenge = models.ForeignKey(
        Challenge, on_delete=models.CASCADE, related_name='submissions')
    participant = models.ForeignKey(
        Developer, on_delete=models.CASCADE, related_name='submissions')
    submission = models.TextField()

    def get_challenge(self):
        return self.challenge

    def get_participant(self):
        return self.participant

    def get_submission(self):
        return self.submission

    def is_evaluated(self):
        return self.is_evaluated

    def set_evaluated(self):
        self.is_evaluated = True
        self.save()
