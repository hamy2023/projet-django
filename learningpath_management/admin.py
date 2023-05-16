from django.contrib import admin

from learningpath_management.models import LearningPath
from gamifiedcourse_management.models import GamifiedCourse

# Register your models here.


class CourseInline(admin.TabularInline):
    model = GamifiedCourse
    extra = 0 


class LearninPathAdmin(admin.ModelAdmin):
    model = LearningPath
    list_display = ('name', 'description', 'gamifiedcourses_count')
    search_fields = ('name',)
    inlines = [CourseInline]

    def gamifiedcourses_count(self, obj):
        return obj.gamified_courses.count()


admin.site.register(LearningPath, LearninPathAdmin)
