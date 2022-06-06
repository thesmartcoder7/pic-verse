from django.shortcuts import render, redirect
from .forms import *

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
