from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from app.forms import PostCreationForm
from conversations.models import *

# Create your views here.


@login_required
def messages(request):
    user = User.objects.get(username=request.user)
    post_form = PostCreationForm()
    user_messages = []
    user_threads = Thread.objects.filter(participants=user)

    for thread in user_threads:
        id = thread.id
        participants = list(thread.participants.all())
        if user in participants:
            participants.remove(user)
            respondent = participants[0]

        message = {
            'id': id,
            'respondent': respondent
        }

        user_messages.append(message)

    print(user_messages)

    context = {
        'post_form': post_form,
        'user_messages': user_messages
    }
    return render(request, 'app/messages.html', context)
