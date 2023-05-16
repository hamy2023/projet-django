from rest_framework import serializers
from .models import BankOfQuestions, Challenge, Draft, DraftQuestion, DraftSolution, Planning, Question, Solution


class ChallengeSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Challenge
        fields = ['id', 'name', 'category', 'challenge_team_type', 'topic',
                  'difficulty_level', 'description', 'prizes', 'rules', 'getStarted', 'judging_criteria', 'haveGrader', 'image']


class DraftSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Draft
        fields = ['id', 'name', 'category', 'challenge_team_type', 'topic',
                  'difficulty_level', 'description', 'prizes', 'rules', 'getStarted', 'judging_criteria', 'haveGrader', 'image']


class DraftQuestionSerializer(serializers.ModelSerializer):
    draft = serializers.PrimaryKeyRelatedField(
        queryset=Draft.objects.all(), write_only=True)
    points = serializers.IntegerField()
    vr = serializers.BooleanField()
    editor = serializers.BooleanField()

    class Meta:
        model = DraftQuestion
        fields = ['id', 'content', 'draft',
                  'points', 'vr', 'editor']

    def create(self, validated_data):
        draft = validated_data.pop('draft')
        draft_question = DraftQuestion.objects.create(**validated_data)
        draft_question.draft.set([draft])
        return draft_question

    def update(self, instance, validated_data):
        draft = validated_data.pop('draft', None)
        if draft is not None:
            instance.draft.set([draft])
        instance.content = validated_data.get('content', instance.content)
        instance.points = validated_data.get('points', instance.points)
        instance.vr = validated_data.get('vr', instance.vr)
        instance.editor = validated_data.get('editor', instance.editor)
        instance.save()
        return instance


class QuestionSerializer(serializers.ModelSerializer):
    challenge = serializers.PrimaryKeyRelatedField(
        queryset=Challenge.objects.all(), write_only=True)
    points = serializers.IntegerField()
    vr = serializers.BooleanField()
    editor = serializers.BooleanField()
    bank = serializers.PrimaryKeyRelatedField(
        queryset=BankOfQuestions.objects.all(), allow_null=True, required=False)

    class Meta:
        model = Question
        fields = ['id', 'content', 'challenge',
                  'points', 'vr', 'editor', 'bank']

    def create(self, validated_data):
        challenge = validated_data.pop('challenge')
        question = Question.objects.create(**validated_data)
        question.challenge.set([challenge])
        return question

    def update(self, instance, validated_data):
        challenge = validated_data.pop('challenge', None)
        if challenge is not None:
            instance.challenge.set([challenge])
        instance.content = validated_data.get('content', instance.content)
        instance.points = validated_data.get('points', instance.points)
        instance.vr = validated_data.get('vr', instance.vr)
        instance.editor = validated_data.get('editor', instance.editor)
        instance.bank = validated_data.get('bank', instance.bank)
        instance.save()
        return instance


class QuestionChallengeSerializer(serializers.ModelSerializer):
    challenge_name = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ['id', 'content', 'challenge_name']

    def get_challenge_name(self, obj):
        # Get the first challenge associated with the question
        challenge = obj.challenge.first()
        if challenge:
            return challenge.name
        return None


class DraftSolutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DraftSolution
        fields = ('id', 'draft', 'content')


class SolutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solution
        fields = ('id', 'challenge', 'content')


class PlanningSerializer(serializers.ModelSerializer):
    challenge_name = serializers.CharField(source='challenge.name')
    category = serializers.CharField(source='challenge.category')
    start = serializers.DateTimeField(source='start_date')
    end = serializers.DateTimeField(source='end_date')
    description = serializers.CharField(source='challenge.description')

    class Meta:
        model = Planning
        fields = ['id', 'challenge_name', 'category',
                  'start', 'end', 'description']


class BankOfQuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankOfQuestions
        fields = ('id', 'name')


class BankQuestionSerializer(serializers.ModelSerializer):
    challenge_name = ChallengeSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ('id', 'content', 'challenge_name')


class BankOfQuestionSerializer(serializers.ModelSerializer):
    questions = BankQuestionSerializer(many=True, read_only=True)

    class Meta:
        model = BankOfQuestions
        fields = ('id', 'name', 'questions')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        return {'id': data['id'], 'name': data['name'], 'questions': data['questions']}
