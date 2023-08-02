from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render, redirect, HttpResponse
from .forms import *
from .models import *
import json
from app.forms import *

# Create your views here.


def signup(request):
    """
    View function for user signup.

    If the request method is POST, it attempts to process the user signup form.
    If the form is valid, it saves the user and redirects to the user login page.
    If the form is not valid, it renders the signup page with the form and error messages.

    If the request method is GET, it renders the signup page with an empty signup form.

    Args:
        request (HttpRequest): The HTTP request object.

    Returns:
        HttpResponse: The HTTP response object.
    """
    if request.method == 'POST':
        form = UserSignupForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('user-login')
        else:
            return render(request, 'users/signup.html', {'form': form})
    else:
        form = UserSignupForm()
        return render(request, 'users/signup.html', {'form': form})


def follow_count(user_id, followee_id):
    """
    Get the count of followers for a user and followees for a followee.

    Args:
        user_id (int): The ID of the user.
        followee_id (int): The ID of the followee.

    Returns:
        list: A list containing the count of followers for the user,
              the appropriate text label for the followers count,
              the count of followees for the followee,
              and the appropriate text label for the followees count.
    """
    userFollows = Follow.objects.filter(follower=user_id)
    followeeFollows = Follow.objects.filter(following=followee_id)
    u_following_a = []
    for follow in userFollows:
        if follow.follower:
            u_following_a.append(follow)
    if u_following_a:
        u_following = len(u_following_a)
        uft = 'Followers' if u_following > 1 else 'Follower'
    else:
        u_following = 0
        uft = 'Followers'

    f_following_a = []
    for follow in followeeFollows:
        if follow.follower:
            f_following_a.append(follow)
    if f_following_a:
        f_following = len(f_following_a)
        fft = 'Followers' if f_following > 1 else 'Follower'
    else:
        f_following = 0
        fft = 'Followers'

    return [u_following, uft, f_following, fft]


@login_required
def follow(request, user1, user2):
    """
    View function to handle following/unfollowing another user.

    This view requires the user to be logged in. It allows the currently logged-in user
    to follow or unfollow another user.

    Args:
        request (HttpRequest): The HTTP request object.
        user1 (str): The username of the follower user.
        user2 (str): The username of the followee user.

    Returns:
        HttpResponse: The HTTP response object containing a JSON response.
        The JSON response includes status information, follower counts, and text labels.
    """
    user1 = User.objects.filter(username=user1).first()
    user2 = User.objects.filter(username=user2).first()
    followee_profile = Profile.objects.filter(user=user2).first()
    follow = Follow.objects.filter(follower=request.user.id)

    response = {
        'status': False,
        'message': 'An issue occurred!',
    }

    if follow:
        for item in follow:
            if item.following == followee_profile:
                item.delete()
                data = follow_count(user1.id, followee_profile.user.id)
                response = {
                    'status': True,
                    'auth_following': data[0],
                    'auth_follow_text': data[1],
                    'followee_following': data[2],
                    'followee_text': data[3],
                    'button_text': 'Follow'
                }
                return HttpResponse(json.dumps(response))

            else:
                new, created = Follow.objects.get_or_create(
                    follower=item.follower, following=followee_profile)
                new.save()
                data = follow_count(user1.id, followee_profile.user.id)
                response = {
                    'status': True,
                    'auth_following': data[0],
                    'auth_follow_text': data[1],
                    'followee_following': data[2],
                    'followee_text': data[3],
                    'button_text': 'Unfollow'
                }
                return HttpResponse(json.dumps(response))

    else:
        follower_user = User.objects.filter(username=request.user).first()
        follower_profile = Profile.objects.filter(user=follower_user).first()
        new, created = Follow.objects.get_or_create(
            follower=follower_profile, following=followee_profile)
        new.save()
        data = follow_count(user1.id, followee_profile.user.id)
        response = {
            'status': True,
            'auth_following': data[0],
            'auth_follow_text': data[1],
            'followee_following': data[2],
            'followee_text': data[3],
            'button_text': 'Unfollow'
        }
        return HttpResponse(json.dumps(response))
