from calendar import c
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render, redirect, get_object_or_404
from .forms import *
from .models import *

# Create your views here.
def signup(request):
    if request.method == 'POST':
        form = UserSignupForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('user-login')
        else:
            
             return render(request, 'users/signup.html', {'form':form})
    else:
        form = UserSignupForm()
        return render(request, 'users/signup.html', {'form':form})



@login_required
def follow(request, username):
    user = User.objects.filter(username=username).first()
    followee_profile = Profile.objects.filter(user=user).first()

    follow = Follow.objects.filter(follower = request.user.id )
    if follow:
        for item in follow:
            if item.following == followee_profile:
                item.delete()
            else:
                new, created = Follow.objects.get_or_create(follower=item.follower, following=followee_profile)
                new.save()
    else:
        follower_user = User.objects.filter(username=request.user).first()
        follower_profile = Profile.objects.filter(user=follower_user).first()
        new, created = Follow.objects.get_or_create(follower=follower_profile, following=followee_profile)
        new.save()
    
    return redirect('insta-home')