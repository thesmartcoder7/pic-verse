"""
    This module contains Django views for the 'app' application. The views handle
    various HTTP requests and render the appropriate templates to display data
    related to user messages.

    Required Imports:
    - django.shortcuts.render: Renders the HTML template with the given context.
    - django.contrib.auth.decorators.login_required: Ensures that the user must be logged in to access this view.
    - app.forms.PostCreationForm: The form used to create new posts (messages).
    - conversations.models.Thread: The model representing a conversation thread.
    - conversations.models.DirectMessage: The model representing direct messages.
"""

from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth.decorators import login_required
from app.forms import PostCreationForm
from conversations.models import *
from conversations.serializers import *
from django.core.serializers import serialize
import json


@login_required
def messages(request):
    """
    View function for displaying user messages.

    This view displays the messages for the authenticated user. It fetches the
    user's threads and associated messages to show in the template.

    Returns:
    django.http.HttpResponse: The HTTP response containing the rendered template with user messages.

    """
    # Get the authenticated user
    user = User.objects.get(username=request.user)

    # Create a new instance of the PostCreationForm for creating new messages
    post_form = PostCreationForm()

    # Initialize an empty list to hold the user's messages
    user_messages = []

    # Get all the threads the user is part of
    user_threads = Thread.objects.filter(participants=user)

    # Process each thread to prepare data for the template
    for thread in user_threads:
        id = thread.id
        participants = list(thread.participants.all())

        # Get all the messages for the current thread and reverse the order to get the latest message first
        thread_messages = list(
            reversed(DirectMessage.objects.filter(thread=id)))

        # Remove the current user from the participants list to find the respondent
        if user in participants:
            participants.remove(user)
            respondent = participants[0]

        last_in = None
        if thread_messages:
            last_in = thread_messages[0]

        # Create a dictionary containing relevant data for each thread
        message = {
            'id': id,
            'respondent': respondent,
            'last_in': last_in
        }

        # Append the message data to the user_messages list
        user_messages.append(message)

    # Prepare the context to be passed to the template
    context = {
        'post_form': post_form,
        'user_messages': user_messages
    }

    # Render the 'messages.html' template with the given context and return as an HTTP response
    return render(request, 'app/messages.html', context)


@login_required
def delete_thread(request, id):
    try:
        thread = Thread.objects.get(id=id)
        if thread:
            thread.delete()
    except:
        print("There is no such thread that exists")

    return redirect('insta-messages')


@login_required
def view_thread(request, id):
    response = {
        'status': False,
        'message': 'An issue occurred!',
    }
    try:
        messages = DirectMessage.objects.filter(thread=id)
        serialized_data = serialize("json", messages, fields=(
            'thread', 'author', 'author__username', 'content', 'timestamp'), use_natural_foreign_keys=True)
        response = {
            'status': True,
            'messages': serialized_data,
        }
        return HttpResponse(json.dumps(response))

    except:
        # return redirect('insta-messages')
        return HttpResponse(json.dumps(response))


@login_required
def reply_to_thread(request, id):
    return HttpResponse('this route works')
