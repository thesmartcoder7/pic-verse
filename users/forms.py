from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Profile


class UserSignupForm(UserCreationForm):
    
    email = forms.EmailField(widget=forms.EmailInput(attrs={'placeholder':('youremail@company.com')}))

    def __init__(self, *args, **kwargs):
            super(UserCreationForm, self).__init__(*args, **kwargs)
            self.fields['username'].widget.attrs.update({'placeholder': 'username'})
            self.fields['password1'].widget.attrs.update({'placeholder': 'password'})
            self.fields['password2'].widget.attrs.update({'placeholder': 'confirm password'})
      

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

        