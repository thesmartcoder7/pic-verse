from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserChangeForm
from users.models import Profile
from .models import Post



class PostCreationForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['image', 'name', 'caption']



class UserUpdateForm(UserChangeForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name']


class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['image', 'bio']

