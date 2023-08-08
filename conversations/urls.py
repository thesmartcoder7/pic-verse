
from django.urls import path
from . import views

urlpatterns = [
    path('', views.messages, name='insta-messages'),
    path('messages/delete/<int:id>', views.delete_thread, name='delete-thread')
]
