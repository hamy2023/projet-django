from django.urls import path
from .views import LearningPathDetail, LearningPathList

urlpatterns = [
    path('learning-paths/', LearningPathList.as_view(),
         name='learning_paths_list'),

    path('learning-paths/<int:id>/', LearningPathDetail.as_view(),
         name='learning-path-detail'),
]
