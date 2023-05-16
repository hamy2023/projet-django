from django.db import models
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from accounts.models import User

from django_enumfield import enum


# Create your models here.
class Draft(models.Model):
    DIFFICULTY_LEVELS = (
        ('1 star', '1 star'),
        ('2 star', '2 star'),
        ('3 star', '3 star'),
        ('4 star', '4 star'),
        ('5 star', '5 star')
    )
    CHALLENGE_TYPES = (
        ('Team challenge', 'Team'),
        ('Individual challenge', 'Individual'),
    )
    CHALLENGE_CATEGORIES = (
        ('Hackathon', 'Hackathon'),
        ('Job Challenge', 'Job Challenge'),
    )
    CHALLENGE_TOPICS = (
        ('Data types', 'Data types'),
        ('Lists', 'Lists'),
        ('Dictionaries', 'Dictionaries'),
        ('Conditions', 'Conditions'),
        ('Loops', 'Loops'),
        ('Operators', 'Operators'),
        ('Functions', 'Functions'),
        ('Django', 'Django'),
        ('Flask', 'Flask'),
        ('Lambda Expressions', 'Lambda Expressions'),
        ('Decorators', 'Decorators'),
        ('Exception Handling', 'Exception Handling'),
        ('Multithreading', 'Multithreading'),
        ('Machine Learning', 'Machine Learning'),
        ('Data Visualization', 'Data Visualization'),
        ('Data Science', 'Data Science'),
        ('Web Scraping', 'Web Scraping'),
    )

    name = models.CharField(max_length=255, default='')
    category = models.CharField(max_length=255, choices=CHALLENGE_CATEGORIES)
    challenge_team_type = models.CharField(
        max_length=255, choices=CHALLENGE_TYPES,)
    topic = models.CharField(max_length=255)
    difficulty_level = models.CharField(
        max_length=255, choices=DIFFICULTY_LEVELS)
    description = models.TextField(default='')
    status = models.BooleanField(default=False)
    prizes = models.TextField(default='')
    rules = models.TextField(default='')
    getStarted = models.TextField(default='')
    judging_criteria = models.TextField(default='')
    haveGrader = models.BooleanField(default=False)
    image = models.ImageField(
        upload_to='challenge_images/', default='', null=True, blank=True)
    """created_by = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name='created_challenges', default=1) """

    def __str__(self):
        return self.name


class Challenge(models.Model):
    DIFFICULTY_LEVELS = (
        ('1 star', '1 star'),
        ('2 star', '2 star'),
        ('3 star', '3 star'),
        ('4 star', '4 star'),
        ('5 star', '5 star')
    )
    CHALLENGE_TYPES = (
        ('Team challenge', 'Team'),
        ('Individual challenge', 'Individual'),
    )
    CHALLENGE_CATEGORIES = (
        ('Hackathon', 'Hackathon'),
        ('Job Challenge', 'Job Challenge'),
    )
    CHALLENGE_TOPICS = (
        ('Data types', 'Data types'),
        ('Lists', 'Lists'),
        ('Dictionaries', 'Dictionaries'),
        ('Conditions', 'Conditions'),
        ('Loops', 'Loops'),
        ('Operators', 'Operators'),
        ('Functions', 'Functions'),
        ('Django', 'Django'),
        ('Flask', 'Flask'),
        ('Lambda Expressions', 'Lambda Expressions'),
        ('Decorators', 'Decorators'),
        ('Exception Handling', 'Exception Handling'),
        ('Multithreading', 'Multithreading'),
        ('Machine Learning', 'Machine Learning'),
        ('Data Visualization', 'Data Visualization'),
        ('Data Science', 'Data Science'),
        ('Web Scraping', 'Web Scraping'),
    )

    name = models.CharField(max_length=255, default='')
    category = models.CharField(max_length=255, choices=CHALLENGE_CATEGORIES)
    challenge_team_type = models.CharField(
        max_length=255, choices=CHALLENGE_TYPES,)
    topic = models.CharField(max_length=255)
    difficulty_level = models.CharField(
        max_length=255, choices=DIFFICULTY_LEVELS)
    description = models.TextField(default='')
    status = models.BooleanField(default=False)
    prizes = models.TextField(default='')
    rules = models.TextField(default='')
    getStarted = models.TextField(default='')
    judging_criteria = models.TextField(default='')
    haveGrader = models.BooleanField(default=False)
    image = models.ImageField(
        upload_to='challenge_images/', default='', null=True, blank=True)
    """ participants = models.ManyToManyField(
        Developer, related_name='participated_challenges', blank=True)
    created_by = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name='created_challenges', default=1) """

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
        User, on_delete=models.CASCADE, related_name='submissions')
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


class BankOfQuestions(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Bank of question"


class DraftQuestion(models.Model):
    draft = models.ManyToManyField(Draft)
    content = models.TextField()
    points = models.IntegerField(default=0)
    vr = models.BooleanField(default=False)
    editor = models.BooleanField(default=True)


class Question(models.Model):
    challenge = models.ManyToManyField(Challenge)
    content = models.TextField()
    points = models.IntegerField(default=0)
    vr = models.BooleanField(default=False)
    editor = models.BooleanField(default=True)
    bank = models.ForeignKey(
        BankOfQuestions, on_delete=models.PROTECT, default='', blank=True, null=True)


class DraftSolution(models.Model):
    draft = models.OneToOneField(Draft, on_delete=models.CASCADE)
    content = models.TextField()
    """ instructor = models.ForeignKey(Instructor, on_delete=models.PROTECT) """

    def __str__(self):
        return self.content


class Solution(models.Model):
    challenge = models.OneToOneField(Challenge, on_delete=models.CASCADE)
    content = models.TextField()
    """ instructor = models.ForeignKey(Instructor, on_delete=models.PROTECT) """

    def __str__(self):
        return self.content


class Planning(models.Model):
    challenge = models.OneToOneField(Challenge, on_delete=models.CASCADE)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    """ admin = models.OneToOneField(Admin, on_delete=models.PROTECT)
    grader = models.ForeignKey(
        Instructor, blank=True, on_delete=models.PROTECT) """


class Team(models.Model):
    developer = models.ForeignKey(User, on_delete=models.PROTECT)
    challenge = models.ManyToManyField(Challenge)
    team_name = models.CharField(max_length=255)


class TeamSubmission(models.Model):
    challenge = models.ForeignKey(
        Challenge, on_delete=models.CASCADE, related_name='team_submissions')
    team = models.ForeignKey(
        Team, on_delete=models.CASCADE, related_name='team_submissions')
    submission = models.TextField()


class Evaluation(models.Model):
    challenge = models.OneToOneField(Challenge, on_delete=models.CASCADE)
    intructor = models.ForeignKey(
        User, on_delete=models.PROTECT, blank=True)
    individual_submission = models.OneToOneField(
        ChallengeSubmission, blank=True, on_delete=models.CASCADE)
    team_submission = models.OneToOneField(
        TeamSubmission, blank=True, on_delete=models.CASCADE)
    grade = models.IntegerField()
    feedback = models.TextField()
