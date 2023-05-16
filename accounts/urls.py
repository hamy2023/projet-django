from django.urls import path, include
from accounts.views import UserDetailView

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('users/me/', UserDetailView.as_view(), name='user-detail'),

]
