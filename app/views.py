from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import * 

# Create your views here.
@login_required
def home(request):
    return render(request, 'app/index.html')

@login_required
def profile(request):
    return render(request, 'app/profile.html')

@login_required
def explore(request):
    return render(request, 'app/explore.html')

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
            'p_form': p_form
        }
        return render(request, 'app/settings.html', context)


@login_required
def igtv(request):
    return render(request, 'app/igtv.html')