from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Profile


class UserSignupForm(UserCreationForm):
    
    email = forms.EmailField(widget=forms.EmailInput(attrs={'placeholder':('youremail@company.com')}))

    class Meta:
        """
        This simply specifies what model this form is going to interact with.
        It gives a nested namespace for configurations and it keeps the 
        the configurations in one place. Within the configuration, the model to
        be associated is specified
        """
        model = User
        fields = ['username', 'email', 'password1', 'password2']


        #  def __init__(self, *args, **kwargs):
        # super(CommentForm, self).__init__(*args, **kwargs)
        # self.fields['comment'].widget.attrs.update({'placeholder':'Add a comment...'})