from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from users.models import Follow
from .forms import *
from .models import *
from django_htmx.http import trigger_client_event

import random
import json


def check_follow(logged_user, post_user):
    user = User.objects.filter(username=post_user).first()
    followee_profile = Profile.objects.filter(user=user).first()
    follow = Follow.objects.filter(follower=logged_user.id)

    if follow:
        for item in follow:
            if item.following == followee_profile:
                return True
            else:
                return False
    else:
        return False


def check_like(logged_user, post_id):
    likes = Like.objects.filter(user=logged_user.id)
    if likes:
        for like in likes:
            if like.user == logged_user and like.post.id == post_id:
                return True
            else:
                return False


# Create your views here.
@login_required
def home(request):
    post_form = PostCreationForm()
    c_form = CommentForm(request.POST)
    posts = list(Post.objects.all())
    all_comments = list(Comment.objects.all())
    posts.reverse()
    final_posts = []
    feeder_posts = []
    current_user = User.objects.filter(username=request.user.username).first()
    user_following = []
    all_follows = Follow.objects.filter(follower=current_user.profile)

    for follow in all_follows:
        user_following.append(follow.following.user.id)

    if (len(posts)) > 5:
        for i in range(5):
            final_posts.append(
                (
                    posts[i],
                    check_follow(request.user, posts[i].user.username),
                    check_like(request.user, posts[i].id)
                )
            )
    else:
        for i in range(len(posts)):
            final_posts.append(
                (
                    posts[i],
                    check_follow(request.user, posts[i].user.username),
                    check_like(request.user, posts[i].id)
                )
            )

    for i in range(len(posts)):
        for id in user_following:
            if posts[i].user.id == id:
                feeder_posts.append(
                    (
                        posts[i],
                        check_follow(request.user, posts[i].user.username),
                        check_like(request.user, posts[i].id)
                    )
                )

    random.shuffle(feeder_posts)

    if request.method == 'POST':
        post_form = PostCreationForm(
            request.POST, request.FILES, instance=request.user)
        c_form = CommentForm(request.POST)
        context = {
            'post_form': post_form,
            'posts': final_posts,
            'all_comments': all_comments,
            'c_form': c_form,
            'randomized_posts': feeder_posts
        }
        if post_form.is_valid():
            name = post_form.cleaned_data.get('name')
            image = post_form.cleaned_data.get('image')
            caption = post_form.cleaned_data.get('caption')
            post, created = Post.objects.get_or_create(
                name=name, image=image, caption=caption, user=request.user)
            post.save()
            return redirect('insta-home')
        else:
            context = {
                'post_form': post_form,
                'posts': final_posts,
                'all_comments': all_comments,
                'c_form': c_form,
                'randomized_posts': feeder_posts
            }
            return render(request, 'app/index.html', context)
    else:
        post_form = PostCreationForm()
        context = {
            'post_form': post_form,
            'posts': final_posts,
            'all_comments': all_comments,
            'c_form': c_form,
            'randomized_posts': feeder_posts
        }
        return render(request, 'app/index.html', context)


@login_required
def profile(request):
    post_form = PostCreationForm()
    c_form = CommentForm(request.POST)
    posts = list(Post.objects.filter(user=request.user))
    all_comments = list(Comment.objects.all())
    posts.reverse()
    final_posts = []

    for i in range(len(posts)):
        final_posts.append(
            (
                posts[i],
                check_follow(request.user, posts[i].user.username),
                check_like(request.user, posts[i].id)
            )
        )

    if request.method == 'POST':
        post_form = PostCreationForm(
            request.POST, request.FILES, instance=request.user)
        c_form = CommentForm(request.POST)
        context = {
            'post_form': post_form,
            'posts': final_posts,
            'all_comments': all_comments,
            'c_form': c_form
        }
        if post_form.is_valid():
            name = post_form.cleaned_data.get('name')
            image = post_form.cleaned_data.get('image')
            caption = post_form.cleaned_data.get('caption')
            post, created = Post.objects.get_or_create(
                name=name, image=image, caption=caption, user=request.user)
            post.save()
            return redirect('insta-profile')
        else:
            context = {
                'post_form': post_form,
                'posts': final_posts,
                'all_comments': all_comments,
                'c_form': c_form
            }
            return render(request, 'app/profile.html', context)
    else:
        post_form = PostCreationForm()
        context = {
            'post_form': post_form,
            'posts': final_posts,
            'all_comments': all_comments,
            'c_form': c_form
        }
        return render(request, 'app/profile.html', context)


@login_required
def explore(request):
    post_form = PostCreationForm()
    c_form = CommentForm(request.POST)
    posts = list(Post.objects.all())
    all_comments = list(Comment.objects.all())
    all_users = list(User.objects.all())
    posts.reverse()
    final_posts = []
    for i in range(len(posts)):
        final_posts.append(
            (
                posts[i],
                check_follow(request.user, posts[i].user.username),
                check_like(request.user, posts[i].id)
            )
        )

    if request.method == 'POST':
        post_form = PostCreationForm(
            request.POST, request.FILES, instance=request.user)
        c_form = CommentForm(request.POST)
        context = {
            'post_form': post_form,
            'posts': final_posts,
            'all_comments': all_comments,
            'c_form': c_form,
            'all_users': all_users
        }
        if post_form.is_valid():
            name = post_form.cleaned_data.get('name')
            image = post_form.cleaned_data.get('image')
            caption = post_form.cleaned_data.get('caption')
            post, created = Post.objects.get_or_create(
                name=name, image=image, caption=caption, user=request.user)
            post.save()
            return redirect('insta-explore')
        else:
            context = {
                'post_form': post_form,
                'posts': final_posts,
                'all_comments': all_comments,
                'c_form': c_form,
                'all_users': all_users
            }
            return render(request, 'app/explore.html', context)
    else:
        post_form = PostCreationForm()
        context = {
            'post_form': post_form,
            'posts': final_posts,
            'all_comments': all_comments,
            'c_form': c_form,
            'all_users': all_users
        }
        return render(request, 'app/explore.html', context)


@login_required
def settings(request):
    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST, instance=request.user)
        p_form = ProfileUpdateForm(
            request.POST, request.FILES, instance=request.user.profile)
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
def messages(request):
    context = {}
    return render(request, 'app/messages.html', context)


@login_required
def single_user(request, username):
    post_form = PostCreationForm()
    c_form = CommentForm(request.POST)
    user = User.objects.filter(username=username).first()
    posts = list(Post.objects.filter(user=user))
    all_comments = list(Comment.objects.all())
    posts.reverse()
    final_posts = []
    follow = check_follow(request.user, user)
    for i in range(len(posts)):
        final_posts.append(
            (
                posts[i],
                check_follow(request.user, posts[i].user.username),
                check_like(request.user, posts[i].id)
            )
        )

    if request.method == 'POST':
        post_form = PostCreationForm(
            request.POST, request.FILES, instance=request.user)
        c_form = CommentForm(request.POST)
        context = {
            'post_form': post_form,
            'posts': final_posts,
            'all_comments': all_comments,
            'c_form': c_form,
            'filtered_user': user,
            'follow': follow
        }
        if post_form.is_valid():
            name = post_form.cleaned_data.get('name')
            image = post_form.cleaned_data.get('image')
            caption = post_form.cleaned_data.get('caption')
            post, created = Post.objects.get_or_create(
                name=name, image=image, caption=caption, user=request.user)
            post.save()
            return redirect('insta-profile')
        else:
            context = {
                'post_form': post_form,
                'posts': final_posts,
                'all_comments': all_comments,
                'c_form': c_form,
                'filtered_user': user,
                'follow': follow
            }
            return render(request, 'app/user_profile.html', context)
    else:
        post_form = PostCreationForm()
        context = {
            'post_form': post_form,
            'posts': final_posts,
            'all_comments': all_comments,
            'c_form': c_form,
            'filtered_user': user,
            'follow': follow
        }
        return render(request, 'app/user_profile.html', context)


@login_required
def like(request, post_id):
    user = User.objects.filter(username=request.user).first()
    post = Post.objects.filter(id=post_id).first()
    likes = Like.objects.filter(user=request.user)
    response = {
        'status': False,
        'message': 'An issuer occured!',
    }
    context = {'post': post}
    if likes:
        for item in likes:
            if item.post == post:
                item.delete()
                post.likes -= 1
                post.save()
                response = {
                    'status': True,
                    'likes': post.likes,
                    'button_text': 'Like'
                }
                return HttpResponse(json.dumps(response))
            else:
                new, created = Like.objects.get_or_create(user=user, post=post)
                new.save()
                post.likes += 1
                post.save()
                response = {
                    'status': True,
                    'likes': post.likes,
                    'button_text': 'Unlike'
                }
                return HttpResponse(json.dumps(response))
    else:
        new, created = Like.objects.get_or_create(user=user, post=post)
        new.save()
        post.likes += 1
        post.save()
        response = {
            'status': True,
            'likes': post.likes,
            'button_text': 'Unlike'
        }
        return HttpResponse(json.dumps(response))


@login_required
def comments(request, post_id):
    c_form = CommentForm(request.POST)
    if request.method == 'POST':
        c_form = CommentForm(request.POST)
        if c_form.is_valid():
            user = User.objects.filter(username=request.user).first()
            post = Post.objects.filter(id=post_id).first()
            new, created = Comment.objects.get_or_create(
                user=user, content=request.POST['content'], post=post)
            new.save()
            post.comments += 1
            post.save()
            return redirect('insta-home')
        else:
            return redirect('insta-home')
    else:
        c_form = CommentForm(request.POST)
        return redirect('insta-home')


@login_required
def search(request):
    if request.method == 'POST':
        all_users = User.objects.all()
        filtered_users = []
        search_term = request.POST['search'].split(' ')
        for user in all_users:
            for term in search_term:
                if term in user.username and user not in filtered_users and term != "" \
                        or term in user.first_name and user not in filtered_users and term != "" \
                        or term in user.last_name and user not in filtered_users and term != "":
                    filtered_users.append(user)

    return render(request, 'app/search.html', {'found_users': filtered_users})
