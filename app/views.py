from django.shortcuts import render
from django.contrib.auth.decorators import login_required

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
    return render(request, 'app/settings.html')

@login_required
def igtv(request):
    return render(request, 'app/igtv.html')