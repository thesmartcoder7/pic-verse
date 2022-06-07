from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import * 
from .models import Post

# Create your views here.
@login_required
def home(request):
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
            return render(request, 'app/index.html', context)
    else:
        post_form = PostCreationForm()
        context = {
            'post_form': post_form
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
        post_form = PostCreationForm()
        u_form = UserUpdateForm(request.POST, instance=request.user)
        p_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
        context = {
            'u_form': u_form,
            'p_form': p_form,
            'post_form': post_form
        }
        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            return redirect('insta-home')
        elif post_form.is_valid():
            name = post_form.cleaned_data.get('name')
            image = post_form.cleaned_data.get('image')
            caption = post_form.cleaned_data.get('caption')
            post,created = Post.objects.get_or_create(name=name, image=image, caption=caption, user=request.user)
            post.save()
            return redirect('insta-home')
        else:
            
             return render(request, 'app/settings.html', context)
    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=request.user.profile)
        post_form = PostCreationForm(request.POST, request.FILES, instance=request.user )
        context = {
            'u_form': u_form,
            'p_form': p_form,
            'post_form': post_form
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
