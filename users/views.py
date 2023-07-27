from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render, redirect, HttpResponse
from .forms import *
from .models import *
import json
from app.forms import *

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
    user1 = User.objects.filter(username=user1).first()
    user2 = User.objects.filter(username=user2).first()
    followee_profile = Profile.objects.filter(user=user2).first()
    follow = Follow.objects.filter(follower=request.user.id)

    response = {
        'status': False,
        'message': 'An issuer occured!',
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
