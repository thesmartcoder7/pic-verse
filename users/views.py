from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render, redirect, HttpResponse
from .forms import *
from .models import *
import json

# Create your views here.


def signup(request):
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
    u_following = len(Follow.objects.filter(following=user_id))
    f_followers = len(Follow.objects.filter(follower=followee_id))
    if (u_following > 1 or u_following == 0):
        uft = 'Followers'
    else:
        uft = 'Follower'

    if (f_followers > 1 or f_followers == 0):
        fft = 'Followers'
    else:
        fft = 'Follower'

    return [u_following, uft, f_followers, fft]


@login_required
def follow(request, username):
    user = User.objects.filter(username=username).first()
    followee_profile = Profile.objects.filter(user=user).first()
    follow = Follow.objects.filter(follower=request.user.id)
    response = {
        'status': False,
        'message': 'An issuer occured!',
    }

    if follow:
        for item in follow:
            if item.following == followee_profile:
                item.delete()
                data = follow_count(user.id, followee_profile.user.id)
                response = {
                    'status': True,
                    'auth_following': data[0],
                    'auth_follow_text': data[1],
                    'followee_following': data[2],
                    'followee_text': data[3],
                    'button_text': 'Follow'
                }

            else:
                new, created = Follow.objects.get_or_create(
                    follower=item.follower, following=followee_profile)
                new.save()
                data = follow_count(user.id, followee_profile.user.id)
                response = {
                    'status': True,
                    'auth_following': data[0],
                    'auth_follow_text': data[1],
                    'followee_following': data[2],
                    'followee_text': data[3],
                    'button_text': 'Unfollow'
                }

    else:
        follower_user = User.objects.filter(username=request.user).first()
        follower_profile = Profile.objects.filter(user=follower_user).first()
        new, created = Follow.objects.get_or_create(
            follower=follower_profile, following=followee_profile)
        new.save()
        data = follow_count(user.id, followee_profile.user.id)
        response = {
            'status': True,
            'auth_following': data[0],
            'auth_follow_text': data[1],
            'followee_following': data[2],
            'followee_text': data[3],
            'button_text': 'Unfollow'
        }

    return HttpResponse(json.dumps(response))
