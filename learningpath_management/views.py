from learningpath_management.models import LearningPath
from rest_framework import generics
from rest_framework.response import Response
from .serializers import LearningPathSerializer


class LearningPathList(generics.ListAPIView):
    queryset = LearningPath.objects.all()
    serializer_class = LearningPathSerializer


class LearningPathDetail(generics.RetrieveAPIView):
    queryset = LearningPath.objects.all()
    serializer_class = LearningPathSerializer
    lookup_field = 'id'
