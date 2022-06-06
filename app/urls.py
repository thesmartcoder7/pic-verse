
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='insta-home'),
    path('profile/', views.profile, name='insta-profile')
]
