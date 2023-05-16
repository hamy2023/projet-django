from django.contrib import admin


from gamifiedcourse_management.models import GamifiedCourse, Section, SectionChallenge, Subsection, Text, Video

# Register your models here.


class SectionInline(admin.TabularInline):
    model = Section
    extra = 0


class GamifiedCourseAdmin(admin.ModelAdmin):
    model = GamifiedCourse
    list_display = ('name', 'description', 'is_standalone',
                    'learningpath')
    search_fields = ('name',)
    inlines = [SectionInline]


class SectionChallengeAdmin(admin.ModelAdmin):
    model = SectionChallenge


class SectionVideoAdmin(admin.ModelAdmin):
    model = Video


class SectionTextAdmin(admin.ModelAdmin):
    model = Text


class SubSectionAdmin(admin.ModelAdmin):
    model = Subsection


class SectionAdmin(admin.ModelAdmin):
    model = Section


admin.site.register(GamifiedCourse, GamifiedCourseAdmin)
admin.site.register(Section, SectionAdmin)
""" admin.site.register(Subsection, SubSectionAdmin)
admin.site.register(Video, SectionVideoAdmin)
admin.site.register(Text, SectionTextAdmin)
admin.site.register(SectionChallenge, SectionChallengeAdmin) """
