from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from users.models import Follow
from .forms import * 
from .models import *




def check_follow(logged_user, post_user):
    user = User.objects.filter(username=post_user).first()
    followee_profile = Profile.objects.filter(user=user).first()

    follow = Follow.objects.filter(follower = logged_user.id )
    if follow:
        for item in follow:
            if item.following == followee_profile:
                return True
            else:
                return False
    else:
        return False


def check():
    return True



# Create your views here.
@login_required
def home(request):
    post_form = PostCreationForm()
    posts = list(Post.objects.all())
    all_likes = Like.objects.all()
    posts.reverse()
    final_posts = []
    for i in range(5):
        final_posts.append((posts[i], check_follow(request.user, posts[i].user.username)))
        
    if request.method == 'POST':
        post_form = PostCreationForm(request.POST, request.FILES, instance=request.user )
        context = {
            'post_form': post_form,
            'posts': final_posts,
            'all_likes': all_likes,
            'follow_check': check()
        }
        if post_form.is_valid():
            name = post_form.cleaned_data.get('name')
            image = post_form.cleaned_data.get('image')
            caption = post_form.cleaned_data.get('caption')
            post,created = Post.objects.get_or_create(name=name, image=image, caption=caption, user=request.user)
            post.save()
            return redirect('insta-home')
        else:
            context = {
                'post_form': post_form,
                'posts': final_posts,
                'all_likes': all_likes,
                'follow_check': check()
            }
            return render(request, 'app/index.html', context)
    else:
        post_form = PostCreationForm()
        context = {
            'post_form': post_form,
            'posts': final_posts,
            'all_likes': all_likes,
            'follow_check': check()
        }
        return render(request, 'app/index.html', context)



@login_required
def profile(request):
    post_form = PostCreationForm()
    if request.method == 'POST':
        post_form = PostCreationForm(request.POST, request.FILES, instance=request.user )
        context = {
            'post_form': post_form
        }
        if post_form.is_valid():
            name = post_form.cleaned_data.get('name')
            image = post_form.cleaned_data.get('image')
            caption = post_form.cleaned_data.get('caption')
            post,created = Post.objects.get_or_create(name=name, image=image, caption=caption, user=request.user)
            post.save()
            return redirect('insta-home')
        else:
            return render(request, 'app/profile.html', context)
    else:
        post_form = PostCreationForm()
        context = {
            'post_form': post_form
        }
        return render(request, 'app/profile.html', context)



@login_required
def explore(request):
    post_form = PostCreationForm()
    if request.method == 'POST':
        post_form = PostCreationForm(request.POST, request.FILES, instance=request.user )
        context = {
            'post_form': post_form
        }
        if post_form.is_valid():
            name = post_form.cleaned_data.get('name')
            image = post_form.cleaned_data.get('image')
            caption = post_form.cleaned_data.get('caption')
            post, created = Post.objects.get_or_create(name=name, image=image, caption=caption, user=request.user)
            post.save()
            return redirect('insta-home')
        else:
            return render(request, 'app/explore.html', context)
    else:
        post_form = PostCreationForm()
        context = {
            'post_form': post_form
        }
        return render(request, 'app/explore.html', context)



@login_required
def settings(request):
    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST, instance=request.user)
        p_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
        context = {
            'u_form': u_form,
            'p_form': p_form
        }
        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            
            return redirect('insta-home')
        else:
            return render(request, 'app/settings.html', context)
    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=request.user.profile)
        context = {
            'u_form': u_form,
            'p_form': p_form,
        }
        return render(request, 'app/settings.html', context)




@login_required
def igtv(request):
    post_form = PostCreationForm()
    if request.method == 'POST':
        post_form = PostCreationForm(request.POST, request.FILES, instance=request.user )
        context = {
            'post_form': post_form
        }
        if post_form.is_valid():
            name = post_form.cleaned_data.get('name')
            image = post_form.cleaned_data.get('image')
            caption = post_form.cleaned_data.get('caption')
            post, created = Post.objects.get_or_create(name=name, image=image, caption=caption, user=request.user)
            post.save()
            return redirect('insta-home')
        else:
            return render(request, 'app/igtv.html', context)
    else:
        post_form = PostCreationForm()
        context = {
            'post_form': post_form
        }
        return render(request, 'app/igtv.html', context)



@login_required
def like(request, post_id):
    user = request.user
    post = Post.objects.get(id=post_id)
    current_likes = post.likes

    liked_by_current_user = Like.objects.filter(user=user, post=post).count()
    if not liked_by_current_user:
        Like.objects.create(user=user, post=post)
        current_likes = current_likes + 1
    else:
        Like.objects.filter(user=user, post=post).delete()
        current_likes = current_likes - 1 

    post.likes = current_likes
    post.save()

    return redirect('insta-home')

