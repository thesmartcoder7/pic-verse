from django.contrib.auth import views as auth_views
from django.urls import path
from . import views

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name='users/login.html'),
         name='user-login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='users/logout.html'),
         name='user-logout'),
    path('signup/', views.signup, name='user-signup'),
    path('like/<username>/', views.follow, name='user-follow'),
    path('update_follow/<int:id>', views.update_following,
         name='update-following-count'),
    path('update_followers/<int:id>', views.update_followers,
         name='update-followers-count')

]
