from calendar import c
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render, redirect, HttpResponse
from .forms import *
from .models import *
from django_htmx.http import trigger_client_event

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


@login_required
def follow(request, username):
    user = User.objects.filter(username=username).first()
    followee_profile = Profile.objects.filter(user=user).first()

    follow = Follow.objects.filter(follower=request.user.id)
    if follow:
        for item in follow:
            if item.following == followee_profile:
                item.delete()
                response = HttpResponse('Follow')
                trigger_client_event(response, 'update-following', user.id)
                trigger_client_event(
                    response, 'update-followers', followee_profile.user.id)
            else:
                new, created = Follow.objects.get_or_create(
                    follower=item.follower, following=followee_profile)
                new.save()
                response = HttpResponse('Unfollow')
                trigger_client_event(response, 'update-following', user.id)
                trigger_client_event(
                    response, 'update-followers', followee_profile.user.id)
    else:
        follower_user = User.objects.filter(username=request.user).first()
        follower_profile = Profile.objects.filter(user=follower_user).first()
        new, created = Follow.objects.get_or_create(
            follower=follower_profile, following=followee_profile)
        new.save()
        response = HttpResponse('Unfollow')
        trigger_client_event(response, 'update-following', user.id)
        trigger_client_event(response, 'update-followers',
                             followee_profile.user.id)

    return response


# update followers ajax helper function:
def update_following(request, id):
    user = User.objects.get(id=id)
    return HttpResponse(len(user.profile.following.all()))


def update_followers(request, id):
    user = User.objects.get(id=id)
    response = HttpResponse(len(user.profile.follower.all()))
    trigger_client_event(response, 'update-follower-text', id)
    return response


def update_follower_text(request, id):
    user = User.objects.get(id=id)
    if len(user.profile.follower.all()) > 1 or len(user.profile.follower.all()) == 0:
        return HttpResponse('Followers')
    else:
        return HttpResponse('Follower')


def update_status_text(request, first, second):
    user1 = User.objects.get(id=first)
    user2 = User.objects.get(id=second)
    response = None

    for item in user1.profile.following.all():
        if item.following == user2.profile:
            response = HttpResponse('Unfollow')

        else:
            response = HttpResponse('Follow')

    return response
