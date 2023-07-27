from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from app.forms import PostCreationForm
from conversations.models import *

# Create your views here.


@login_required
def messages(request):
    post_form = PostCreationForm()
    user_messages = Thread.objects.filter(participants=request.user)
    context = {
        'post_form': post_form,
        'user_messages': user_messages
    }
    return render(request, 'app/messages.html', context)
