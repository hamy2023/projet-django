from learningpath_management.serializers import LearningPathSerializer
from rest_framework import serializers
from django.contrib.contenttypes.models import ContentType
from .models import Content, GamifiedCourse, Section, SectionChallenge, Subsection, Text, Video


class GamifiedCourseSerializer(serializers.ModelSerializer):
    learningpath = serializers.SerializerMethodField()

    def get_learningpath(self, obj):
        return obj.learningpath.name if obj.learningpath else None

    class Meta:
        model = GamifiedCourse
        fields = ['id', 'name', 'description', 'is_standalone', 'learningpath']


class LearningPathGamifiedCoursesSerializer(serializers.Serializer):
    gamified_courses = serializers.SerializerMethodField()

    def get_gamified_courses(self, learning_path):
        gamified_courses = GamifiedCourse.objects.filter(
            learningpath=learning_path)
        serializer = GamifiedCourseSerializer(gamified_courses, many=True)
        return serializer.data


class VideoSerializer(serializers.ModelSerializer):
    subsection_name = serializers.CharField(write_only=True)

    class Meta:
        model = Video
        fields = ['id', 'subsection', 'subsection_name',
                  'title', 'points', 'video_file']
        read_only_fields = ['subsection']

    def create(self, validated_data):
        subsection_name = validated_data.pop('subsection_name')
        subsection = Subsection.objects.get(title=subsection_name)
        validated_data['subsection'] = subsection
        video = super().create(validated_data)
        return video

    def update(self, instance, validated_data):
        subsection_name = validated_data.pop('subsection_name')
        subsection = Subsection.objects.get(title=subsection_name)
        instance.subsection = subsection
        instance.title = validated_data.get('title', instance.title)
        instance.points = validated_data.get('points', instance.points)
        instance.video_file = validated_data.get(
            'video_file', instance.video_file)
        instance.save()
        return instance


class TextSerializer(serializers.ModelSerializer):
    subsection_name = serializers.CharField(write_only=True)

    class Meta:
        model = Text
        fields = ['id', 'subsection', 'subsection_name', 'title',
                  'content', 'points', 'pdf_file']
        read_only_fields = ['subsection']

    def create(self, validated_data):
        subsection_name = validated_data.pop('subsection_name')
        subsection = Subsection.objects.get(title=subsection_name)
        validated_data['subsection'] = subsection
        text = super().create(validated_data)
        return text

    def update(self, instance, validated_data):
        subsection_name = validated_data.pop('subsection_name')
        subsection = Subsection.objects.get(title=subsection_name)
        instance.subsection = subsection
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.points = validated_data.get('points', instance.points)
        instance.pdf_file = validated_data.get('pdf_file', instance.pdf_file)
        instance.save()
        return instance


class SectionChallengeSerializer(serializers.ModelSerializer):
    subsection_name = serializers.CharField(write_only=True)

    class Meta:
        model = SectionChallenge
        fields = ['id', 'subsection', 'subsection_name', 'title', 'content', 'points',
                  'quiz', 'editor', 'vr']
        read_only_fields = ['subsection']

    def create(self, validated_data):
        subsection_name = validated_data.pop('subsection_name')
        subsection = Subsection.objects.get(title=subsection_name)
        validated_data['subsection'] = subsection
        challenge = super().create(validated_data)
        return challenge

    def update(self, instance, validated_data):
        subsection_name = validated_data.pop('subsection_name')
        subsection = Subsection.objects.get(title=subsection_name)
        instance.subsection = subsection
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.points = validated_data.get('points', instance.points)
        instance.quiz = validated_data.get('quiz', instance.quiz)
        instance.editor = validated_data.get('editor', instance.editor)
        instance.vr = validated_data.get('vr', instance.vr)
        instance.save()
        return instance


class SectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Section
        fields = ['id', 'name', 'description']


class SectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Section
        fields = ['id', 'name', 'description']


class SubSectionSerializer(serializers.ModelSerializer):
    section_name = serializers.CharField(write_only=True)

    class Meta:
        model = Subsection
        fields = ['id', 'title', 'section_name']

    def create(self, validated_data):
        section_name = validated_data.pop('section_name')
        section = Section.objects.get(name=section_name)
        validated_data['section'] = section
        subsection = super().create(validated_data)
        return subsection

    def update(self, instance, validated_data):
        section_name = validated_data.pop('section_name')
        section = Section.objects.get(name=section_name)
        instance.section = section
        instance.title = validated_data.get('title', instance.title)
        instance.save()
        return instance


class ContentSerializer(serializers.ModelSerializer):
    object = serializers.SerializerMethodField()

    class Meta:
        model = Content
        fields = ['section', 'object']

    def get_object(self, obj):
        # Serialize the content object based on its type
        content_object = obj.content_object

        if isinstance(content_object, Video):
            # Serialize video object
            return VideoSerializer(content_object).data
        elif isinstance(content_object, Text):
            # Serialize text object
            return TextSerializer(content_object).data
        elif isinstance(content_object, SectionChallenge):
            # Serialize challenge object
            return SectionChallengeSerializer(content_object).data
        else:
            # Handle other content types if necessary
            return None
