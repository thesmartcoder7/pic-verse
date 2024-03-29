
from django.urls import path
from . import views

urlpatterns = [
    path('', views.messages, name='insta-messages'),
    path('delete/<int:id>', views.delete_thread, name='delete-thread'),
    path('thread/<int:id>', views.view_thread, name='view-thread'),
    path('thread/reply/<int:id>', views.reply_to_thread, name='replyto-thread'),
    path('compose', views.compose_message, name='compose-message')
]
