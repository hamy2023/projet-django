from challenge_management.serializers import ChallengeSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import GamifiedCourseSerializer, LearningPathGamifiedCoursesSerializer, SectionChallengeSerializer, SectionSerializer, SubSectionSerializer, TextSerializer, VideoSerializer
from .models import GamifiedCourse, LearningPath, Section, SectionChallenge, Subsection, Text, Video


class LearningPathGamifiedCoursesView(generics.RetrieveAPIView):
    queryset = LearningPath.objects.all()
    serializer_class = LearningPathGamifiedCoursesSerializer
    lookup_field = 'id'  # Assuming the lookup field is 'id'


class GamifiedCourseList(generics.ListAPIView):
    queryset = GamifiedCourse.objects.all()
    serializer_class = GamifiedCourseSerializer


class GamifiedCourseDetailView(generics.RetrieveAPIView):
    queryset = GamifiedCourse.objects.all()
    serializer_class = GamifiedCourseSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'course_id'


class SubSectionAPIView(generics.CreateAPIView):
    queryset = Subsection.objects.all()
    serializer_class = SubSectionSerializer


class StandaloneCourseListView(generics.ListAPIView):
    queryset = GamifiedCourse.objects.filter(is_standalone=True)
    serializer_class = GamifiedCourseSerializer


class SectionListView(generics.ListAPIView):
    serializer_class = SectionSerializer

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        return Section.objects.filter(course_id=course_id)


class SectionContentAPIView(APIView):
    def get(self, request, section_id):
        try:
            section = Section.objects.get(id=section_id)
            subsections = section.subsection_set.all()

            data = []
            for subsection in subsections:
                videos = subsection.video_set.all()
                texts = subsection.text_set.all()
                challenges = subsection.sectionchallenge_set.all()

                video_serializer = VideoSerializer(videos, many=True)
                text_serializer = TextSerializer(texts, many=True)
                challenge_serializer = SectionChallengeSerializer(
                    challenges, many=True)

                subsection_data = {
                    'subsection': {
                        'id': subsection.id,  # Add the subsection ID
                        'title': subsection.title
                    },
                    'videos': video_serializer.data,
                    'texts': text_serializer.data,
                    'challenges': challenge_serializer.data
                }
                data.append(subsection_data)

            return Response(data)
        except Section.DoesNotExist:
            return Response(status=404)


class VideoCreateView(generics.CreateAPIView):
    serializer_class = VideoSerializer


class TextCreateView(generics.CreateAPIView):
    serializer_class = TextSerializer


class ChallengeCourseCreateView(generics.CreateAPIView):
    serializer_class = SectionChallengeSerializer


class SubSectionUpdateAPIView(generics.UpdateAPIView):
    queryset = Subsection.objects.all()
    serializer_class = SubSectionSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'subsection_id'


class ChallengeCourseCreateUpdateAPIView(generics.UpdateAPIView):
    queryset = SectionChallenge.objects.all()
    serializer_class = SectionChallengeSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'sectionchallenge_id'


class VideoUpdateAPIView(generics.UpdateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'video_id'


class TextUpdateAPIView(generics.UpdateAPIView):
    queryset = Text.objects.all()
    serializer_class = TextSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'text_id'


class SubSectionDeleteAPIView(generics.DestroyAPIView):
    queryset = Subsection.objects.all()
    serializer_class = SubSectionSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'subsection_id'


class ChallengeCourseDeleteAPIView(generics.DestroyAPIView):
    queryset = SectionChallenge.objects.all()
    serializer_class = SectionChallengeSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'sectionchallenge_id'


class VideoDeleteAPIView(generics.DestroyAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'video_id'


class TextDeleteAPIView(generics.DestroyAPIView):
    queryset = Text.objects.all()
    serializer_class = TextSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'text_id'
