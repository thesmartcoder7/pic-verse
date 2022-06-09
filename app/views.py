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


def check_like(logged_user, post_id):
    likes = Like.objects.filter(user = logged_user.id )
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
    # all_likes = Like.objects.all()
    all_comments = list(Comment.objects.all())
    posts.reverse()
    final_posts = []
    for i in range(5):
        final_posts.append(
            (
                posts[i], 
                check_follow(request.user, posts[i].user.username),
                check_like(request.user, posts[i].id)
            )
        )
        
    if request.method == 'POST':
        post_form = PostCreationForm(request.POST, request.FILES, instance=request.user )
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
            post,created = Post.objects.get_or_create(name=name, image=image, caption=caption, user=request.user)
            post.save()
            return redirect('insta-home')
        else:
            context = {
                'post_form': post_form,
                'posts': final_posts,
                'all_comments': all_comments,
                'c_form': c_form
            }
            return render(request, 'app/index.html', context)
    else:
        post_form = PostCreationForm()
        context = {
            'post_form': post_form,
            'posts': final_posts,
            'all_comments': all_comments,
            'c_form': c_form
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
    user = User.objects.filter(username=request.user).first()
    post = Post.objects.filter(id=post_id).first()

    like = Like.objects.filter(user = request.user)
    if like:
        for item in like:
            print(f'\n{item.post}, {post}\n')
            if item.post == post:
                item.delete()
                post.likes -= 1
                post.save() 
            else:
                new, created = Like.objects.get_or_create(user=user, post=post)
                new.save()
                post.likes += 1
                post.save() 
    else:
        new, created = Like.objects.get_or_create(user=user, post=post)
        new.save()
        post.likes += 1
        post.save()
    
    return redirect('insta-home')




@login_required
def comments(request, post_id):
    c_form = CommentForm(request.POST)
    if request.method == 'POST':
        c_form = CommentForm(request.POST)
        if c_form.is_valid():
            user = User.objects.filter(username = request.user).first()
            post = Post.objects.filter(id=post_id).first()
            new, created = Comment.objects.get_or_create(user=user, content=request.POST['content'], post=post)
            new.save()
            post.comments += 1
            post.save()
            return redirect('insta-home')
        else:
            return redirect('insta-home')
    else:
        c_form = CommentForm(request.POST)
        return redirect('insta-home')