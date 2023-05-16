from rest_framework import serializers
from .models import LearningPath



class LearningPathSerializer(serializers.ModelSerializer):
    gamified_courses_count = serializers.SerializerMethodField()

    class Meta:
        model = LearningPath
        fields = ['id', 'name', 'description', 'gamified_courses_count']

    def get_gamified_courses_count(self, obj):
        return obj.gamified_courses.count()
