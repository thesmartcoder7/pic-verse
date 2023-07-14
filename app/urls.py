
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='insta-home'),
    path('profile/', views.profile, name='insta-profile'),
    path('explore/', views.explore, name='insta-explore'),
    path('settings/', views.settings, name='insta-settings'),
    path('igtv/', views.igtv, name='insta-igtv'),
    path('like/<post_id>/', views.like, name='insta-like'),
    path('comment/<post_id>/', views.comments, name='insta-comment'),
    path('user/<username>/', views.single_user, name='insta-user'),
    path('search/', views.search, name='insta-search')
]
