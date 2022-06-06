from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home(request):
    return render(request, 'app/index.html')


def profile(request):
    return render(request, 'app/profile.html')
    

def explore(request):
    return render(request, 'app/explore.html')