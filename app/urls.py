
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='insta-home'),
    path('profile/', views.profile, name='insta-profile'),
    path('explore/', views.explore, name='insta-explore'),
    path('settings/', views.settings, name='insta-settings'),
    path('igtv/', views.igtv, name='insta-igtv'),
    path('like/<post_id>/', views.like, name='insta-like'),
    path('comment/<post_id>/', views.like, name='insta-comment'),
]
