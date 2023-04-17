from django.db import models
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from accounts.models import Admin, User

# Create your models here.


class Gamification(models.Model):
    description = models.TextField()
    badge_eggs = models.JSONField(default=list)
    max_eggs_per_challenge = models.IntegerField(default=0)
    min_eggs_per_challenge = models.IntegerField(default=0)
    max_eggs_per_learningpath = models.IntegerField(default=0)
    min_eggs_per_learningpath = models.IntegerField(default=0)
    time_to_restore_life_system = models.DurationField(
        default=timedelta(days=2))
    admin = models.OneToOneField(Admin, on_delete=models.PROTECT, default="")

    def set_badge_eggs(self, badge, eggs):
        self.badge_eggs[badge.id] = eggs
        self.save()

    def get_badge_eggs(self, badge):
        return self.badge_eggs.get(str(badge.id), None)

    def set_pycoin_pricing(self, pricing, price):
        pycoin_pricing = self.pycoins.get(pricing=pricing)
        pycoin_pricing.price = price
        pycoin_pricing.save()

    def get_pycoin_pricing(self, pricing):
        pycoin_pricing = self.pycoins.get(pricing=pricing)
        return pycoin_pricing.price

    def get_max_eggs_per_challenge(self):
        return self.max_eggs_per_challenge

    def get_min_eggs_per_challenge(self):
        return self.min_eggs_per_challenge

    def get_max_eggs_per_learningpath(self):
        return self.max_eggs_per_learningpath

    def get_min_eggs_per_learningpath(self):
        return self.min_eggs_per_learningpath

    def get_time_to_restore_life_system(self):
        return self.time_to_restore_life_system
