from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserChangeForm
from users.models import Profile
from .models import *


class PostCreationForm(forms.ModelForm):
    """
    Form for creating a new post.

    Inherits from Django's ModelForm.

    """
    class Meta:
        model = Post
        fields = ['image', 'name', 'caption']


class UserUpdateForm(UserChangeForm):
    """
    Form for updating user information.

    Inherits from Django's UserChangeForm.

    """
    class Meta:
        model = User
        fields = ['first_name', 'last_name']


class ProfileUpdateForm(forms.ModelForm):
    """
    Form for updating profile information.

    Inherits from Django's ModelForm.

    """
    class Meta:
        model = Profile
        fields = ['image', 'bio']


class CommentForm(forms.ModelForm):
    """
    Form for creating a comment.

    Inherits from Django's ModelForm.

    """
    class Meta:
        model = Comment
        exclude = ('user', 'post',)
        fields = ['content']
