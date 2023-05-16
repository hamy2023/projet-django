from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import generics, serializers, status, viewsets
from rest_framework.views import APIView
from .models import BankOfQuestions, Challenge, Draft, DraftQuestion, DraftSolution, Planning, Question, Solution
from .serializers import BankOfQuestionSerializer, BankOfQuestionsSerializer, BankQuestionSerializer, ChallengeSerializer, DraftQuestionSerializer, DraftSerializer, DraftSolutionSerializer, PlanningSerializer, QuestionChallengeSerializer, QuestionSerializer, SolutionSerializer


class ChallengeCreateView(generics.CreateAPIView):
    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer

    def perform_create(self, serializer):
        image = self.request.data.get('image')
        serializer.save(image=image)


class DraftCreateView(generics.CreateAPIView):
    queryset = Draft.objects.all()
    serializer_class = DraftSerializer

    def perform_create(self, serializer):
        image = self.request.data.get('image')
        serializer.save(image=image)


class DraftUpdateView(generics.UpdateAPIView):
    queryset = Draft.objects.all()
    serializer_class = DraftSerializer

    def perform_update(self, serializer):
        image = self.request.data.get('image')
        serializer.save(image=image)


class DraftListAPIView(generics.ListAPIView):
    serializer_class = DraftSerializer
    queryset = Draft.objects.all()


class DraftDetailAPIView(generics.RetrieveAPIView):
    serializer_class = DraftSerializer
    queryset = Draft.objects.all()


@api_view(['GET'])
def get_challenge_id(request, name):

    challenges = Challenge.objects.filter(name=name)
    if challenges:
        challenge = challenges.last()
        return Response({'id': challenge.id})
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_draft_id(request, name):

    drafts = Draft.objects.filter(name=name)
    if drafts:
        draft = drafts.last()
        return Response({'id': draft.id})
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
def delete_draft(request, pk):
    try:
        draft = Draft.objects.get(pk=pk)
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    draft.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


class QuestionCreateAPIView(generics.CreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def perform_create(self, serializer):
        serializer.save()


class DraftQuestionCreateAPIView(generics.CreateAPIView):
    queryset = DraftQuestion.objects.all()
    serializer_class = DraftQuestionSerializer

    def perform_create(self, serializer):
        serializer.save()


class QuestionList(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionChallengeSerializer


class DraftSolutionListCreateView(generics.ListCreateAPIView):
    queryset = DraftSolution.objects.all()
    serializer_class = DraftSolutionSerializer


class SolutionListCreateView(generics.ListCreateAPIView):
    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer


class PlanningListAPIView(generics.ListAPIView):
    serializer_class = PlanningSerializer
    queryset = Planning.objects.all()


class PlanningDetailAPIView(generics.RetrieveAPIView):
    serializer_class = PlanningSerializer
    queryset = Planning.objects.all()


class BankOfQuestionsList(generics.ListCreateAPIView):
    queryset = BankOfQuestions.objects.all()
    serializer_class = BankOfQuestionsSerializer


class BankQuestionAPIView(APIView):
    def get(self, request, bank_name):
        try:
            bank = BankOfQuestions.objects.get(name=bank_name)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        questions = Question.objects.filter(bank=bank)
        serializer = QuestionChallengeSerializer(
            questions, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class DraftQuestionView(APIView):
    serializer_class = DraftQuestionSerializer

    def get(self, request, draft_id):
        try:
            questions = DraftQuestion.objects.filter(draft=draft_id)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DraftSolutionView(APIView):
    serializer_class = DraftSolutionSerializer

    def get(self, request, draft_id):
        try:
            solution = DraftSolution.objects.get(draft=draft_id)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(solution)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DraftQuestionUpdateView(generics.UpdateAPIView):
    serializer_class = DraftQuestionSerializer
    queryset = DraftQuestion.objects.all()

    def get_object(self):
        obj = get_object_or_404(DraftQuestion, id=self.kwargs['pk'])
        return obj

    def perform_update(self, serializer):
        serializer.save()


class DraftSolutionUpdateView(generics.UpdateAPIView):
    serializer_class = DraftSolutionSerializer
    queryset = DraftSolution.objects.all()

    def get_object(self):
        queryset = self.get_queryset()
        obj = queryset.get(draft_id=self.kwargs['draft_id'])
        return obj

    def perform_update(self, serializer):
        serializer.save()

