from django.db import models
from django.conf import settings
from django.utils import timezone
from accounts.models import User
import uuid
# Create your models here.


class BadgeType(models.TextChoices):
    BARBADOS = 'BA', 'Barbados'
    THREAD_SNAKE = 'TS', 'Thread snake'
    RIGNECK = 'RN', 'Rigneck'
    Viper = 'VP', 'Viper'
    BLACK_MAMBA = 'BM', 'Black mamba'
    COBRA = 'CO', 'Cobra'
    PYTHON = 'PY', 'Python'
    ANACONDA = 'AN', 'Anaconda'
    TITANOBOA = 'TB', 'Titanoboa'


class Badge(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    image = models.ImageField(upload_to='badges/')
    point_value = models.IntegerField()
    badge_type = models.CharField(
        max_length=2,
        choices=BadgeType.choices,
        default=BadgeType.BARBADOS,
    )


class Profile(models.Model):
    phone = models.CharField(max_length=255)
    birth_date = models.DateField(null=True)
    bio = models.TextField(blank=True, null=True)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE)


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
        User, related_name='participated_challenges')
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='created_challenges')

    def __str__(self):
        return self.name


class Tool(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Task(models.Model):
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField()
    points = models.PositiveIntegerField(default=0)
    tool = models.ForeignKey(Tool, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class BankOfChallenges(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    points = models.IntegerField()
    tool = models.CharField(max_length=255)


class JobOffer(models.Model):
    job_title = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    required_skills = models.CharField(max_length=255)
    job_description = models.TextField()
    salary = models.IntegerField()
    location = models.CharField(max_length=255)
    job_challenge = models.ForeignKey(
        Challenge, on_delete=models.CASCADE, related_name='job_offers')


class ChallengeSubmission(models.Model):
    challenge = models.ForeignKey(
        Challenge, on_delete=models.CASCADE, related_name='submissions')
    participant = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='submissions')
    submission = models.TextField()


class Evaluation(models.Model):
    submission = models.ForeignKey(
        ChallengeSubmission, on_delete=models.CASCADE, related_name='evaluations')
    challenge = models.ForeignKey(
        Challenge, on_delete=models.CASCADE, related_name='evaluations')
    participant = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='evaluations')
    grade = models.FloatField()
    feedback = models.TextField(blank=True)


class Interview(models.Model):
    interviewee = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='interviews_attended')
    interviewer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='interviews_conducted')
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE)
    scheduled_time = models.DateTimeField()
    questions = models.TextField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"Interview {self.id}: {self.interviewee.username} with {self.interviewer.username}"


class LearningPath(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title


class GamifiedCourse(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    learning_path = models.ForeignKey(LearningPath, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Gamification(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    badges = models.ManyToManyField(Badge)
    points = models.IntegerField()
    currency = models.CharField(max_length=50)
    life_system = models.IntegerField()


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.CharField(max_length=200)
    timestamp = models.DateTimeField(default=timezone.now)
    read = models.BooleanField(default=False)


class Job(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    requirements = models.TextField()
    location = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class Developer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    badges = models.ManyToManyField(Badge)
    points = models.IntegerField(default=0)
    virtual_currency = models.IntegerField(default=0)
    life = models.IntegerField(default=3)
    learning_paths = models.ManyToManyField(LearningPath, blank=True)
    gamified_courses = models.ManyToManyField(GamifiedCourse, blank=True)
    challenges = models.ManyToManyField(Challenge, blank=True)
    jobs = models.ManyToManyField(Job, blank=True)
    interviews = models.ManyToManyField(
        Interview, blank=True, related_name='interviewees')
    notifications = models.ManyToManyField(Notification, blank=True)

    def __str__(self):
        return self.user.email


class Instructor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    courses = models.ManyToManyField(GamifiedCourse)
    challenges = models.ManyToManyField(Challenge)

    def __str__(self):
        return self.user.email


class Recruiter(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    jobs = models.ManyToManyField(Job)
    challenges = models.ManyToManyField(Challenge)
    interviews = models.ManyToManyField(Interview, related_name='recruiters')

    def __str__(self):
        return self.user.email


class Analyst(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.email
