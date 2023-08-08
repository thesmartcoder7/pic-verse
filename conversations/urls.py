
from django.urls import path
from . import views

urlpatterns = [
    path('', views.messages, name='insta-messages'),
    path('delete/<int:id>', views.delete_thread, name='delete-thread'),
    path('thread/<int:id>', views.view_thread, name='view-thread')
]
