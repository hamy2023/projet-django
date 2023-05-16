from django.urls import path, include

from gamifiedcourse_management.views import ChallengeCourseCreateUpdateAPIView, ChallengeCourseCreateView, ChallengeCourseDeleteAPIView, GamifiedCourseDetailView, GamifiedCourseList, LearningPathGamifiedCoursesView, SectionContentAPIView, SectionListView, StandaloneCourseListView, SubSectionAPIView, SubSectionDeleteAPIView, SubSectionUpdateAPIView, TextCreateView, TextDeleteAPIView, TextUpdateAPIView, VideoCreateView, VideoDeleteAPIView, VideoUpdateAPIView

urlpatterns = [
    path('learning-paths/<int:id>/gamified-courses/',
         LearningPathGamifiedCoursesView.as_view(), name='learningpath-gamified-courses'),
    path('gamifiedcourses/details/<int:course_id>/',
         GamifiedCourseDetailView.as_view(), name='gamified-course-detail'),
    path('courses/<int:course_id>/sections/',
         SectionListView.as_view(), name='course-sections'),
    path('sections/<int:section_id>/content/',
         SectionContentAPIView.as_view(), name='section-content'),
    path('standalone-courses/', StandaloneCourseListView.as_view(),
         name='standalone-course-list'),
    path('gamifiedcourses/', GamifiedCourseList.as_view(),
         name='gamified_course_list'),
    path('subsections/create/', SubSectionAPIView.as_view(),
         name='subsections-create'),
    path('subsections/<int:subsection_id>/',
         SubSectionUpdateAPIView.as_view(), name='subsections-update'),
    path('videos/', VideoCreateView.as_view(), name='video-create'),
    path('text/', TextCreateView.as_view(), name='text-create'),
    path('challenge/', ChallengeCourseCreateView.as_view(),
         name='challenge-course-create'),
    path('challenge/<int:sectionchallenge_id>/',
         ChallengeCourseCreateUpdateAPIView.as_view(), name='challenge-update'),
    path('video/<int:video_id>/',
         VideoUpdateAPIView.as_view(), name='video-update'),
    path('text/<int:text_id>/',
         TextUpdateAPIView.as_view(), name='text-update'),
    path('subsections/<int:subsection_id>/delete/',
         SubSectionDeleteAPIView.as_view(), name='subsection-delete'),
    path('challenge/<int:sectionchallenge_id>/delete/',
         ChallengeCourseDeleteAPIView.as_view(), name='challenge-delete'),
    path('video/<int:video_id>/delete/',
         VideoDeleteAPIView.as_view(), name='video-delete'),
    path('text/<int:text_id>/delete/',
         TextDeleteAPIView.as_view(), name='text-delete'),


]
