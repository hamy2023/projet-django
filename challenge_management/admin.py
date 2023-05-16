# admin.py
from django.utils.dateparse import parse_datetime
from django.forms.widgets import DateTimeInput, DateInput, TimeInput
from django import forms
from django.db import models
from django.contrib import admin
from django.forms import BaseInlineFormSet
from django.utils.translation import gettext_lazy as _
from .models import BankOfQuestions, Planning, Challenge, Question, Solution


class ChallengeFormSet(BaseInlineFormSet):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.queryset = Challenge.objects.all()

    def clean(self):
        super().clean()
        if any(self.errors):
            return

        # Ensure that only one Challenge instance is selected for planning
        count = 0
        for form in self.forms:
            if form.cleaned_data.get('DELETE'):
                continue

            if form.cleaned_data.get('id'):
                count += 1

            if count > 1:
                raise forms.ValidationError(
                    _('Only one challenge can be planned at a time.'),
                    code='too_many_challenges'
                )

        if count == 0:
            raise forms.ValidationError(
                _('At least one challenge must be selected for planning.'),
                code='no_challenges_selected'
            )


class ChallengeInline(admin.StackedInline):
    model = Planning
    formset = ChallengeFormSet


class ChallengeAdmin(admin.ModelAdmin):
    list_display = ('name', 'topic', 'category',
                    'difficulty_level', 'status')
    list_filter = ('category',
                   'difficulty_level', 'status')
    search_fields = ('name', 'topic', 'category',
                     'difficulty_level', 'status')


class PlanningForm(forms.ModelForm):
    start_date = forms.DateTimeField(
        input_formats=['%Y-%m-%d %I:%M %p'],
        widget=DateTimeInput(
            attrs={'type': 'datetime-local', 'step': 1}, format='%Y-%m-%dT%H:%M')
    )

    end_date = forms.DateTimeField(
        input_formats=['%Y-%m-%d %I:%M %p'],
        widget=DateTimeInput(
            attrs={'type': 'datetime-local', 'step': 1}, format='%Y-%m-%dT%H:%M')
    )

    class Meta:
        model = Planning
        fields = ['challenge', 'start_date', 'end_date']


class PlanningAdmin(admin.ModelAdmin):
    form = PlanningForm
    list_display = ('challenge', 'start_date', 'end_date')
    list_filter = ('start_date', 'end_date')
    search_fields = ('challenge__name',)
    autocomplete_fields = ('challenge',)


class QuestionInline(admin.TabularInline):
    model = Question
    extra = 0


class BankOfQuestionsAdmin(admin.ModelAdmin):
    model = BankOfQuestions
    list_display = ('name', 'question_count')
    search_fields = ('name',)
    inlines = [QuestionInline]

    def question_count(self, obj):
        return obj.question_set.count()


class QuestionAdmin(admin.ModelAdmin):
    model = Question
    list_display = ('content', 'points', 'vr', 'editor', 'bank')
    list_filter = ('content', 'vr', 'editor')
    search_fields = ('content', 'points', 'vr', 'editor', 'bank')


class SolutionAdmin(admin.ModelAdmin):
    model = Solution
    list_display = ('content', 'challenge')
    search_fields = ('content', 'challenge')


admin.site.register(Challenge, ChallengeAdmin)
admin.site.register(Planning, PlanningAdmin)
admin.site.register(BankOfQuestions, BankOfQuestionsAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Solution, SolutionAdmin)
