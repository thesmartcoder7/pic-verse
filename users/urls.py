from django.contrib.auth import views as auth_views
from django.urls import path
from . import views

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name='users/login.html'),
         name='user-login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='users/logout.html'),
         name='user-logout'),
    path('signup/', views.signup, name='user-signup'),
    path('follow/<user1>/<user2>/', views.follow, name='user-follow'),
    path('dummy/', views.follow_count, name='followcount')
]
