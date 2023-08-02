from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


class UserSignupForm(UserCreationForm):
    """
    Custom signup form for user registration.

    This form extends the Django UserCreationForm to include additional fields for email.

    Attributes:
        email (EmailField): A field for the user's email address.
            It is required for signup and has a placeholder 'youremail@company.com'.
            This field is validated to ensure a valid email address is provided.

    Methods:
        __init__(self, *args, **kwargs): Initializes the form instance.
            It adds placeholders for the username, password, and confirm password fields.

    Meta:
        model (User): The user model to use for the form.
            In this case, it is the Django built-in User model.
        fields (list): The list of fields to include in the form.
            The fields include 'username', 'email', 'password1', and 'password2'.
    """

    email = forms.EmailField(widget=forms.EmailInput(attrs={'placeholder': 'youremail@company.com'}))

    def __init__(self, *args, **kwargs):
        """
        Initializes the UserSignupForm instance.

        It calls the parent class's constructor (UserCreationForm) and adds placeholders
        for the username, password, and confirm password fields.

        Args:
            *args: Variable-length argument list.
            **kwargs: Arbitrary keyword arguments.
        """
        super(UserSignupForm, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({'placeholder': 'username'})
        self.fields['password1'].widget.attrs.update({'placeholder': 'password'})
        self.fields['password2'].widget.attrs.update({'placeholder': 'confirm password'})

    class Meta:
        """
        Metadata for the UserSignupForm class.

        Attributes:
            model (User): The user model to use for the form.
                In this case, it is the Django built-in User model.
            fields (list): The list of fields to include in the form.
                The fields include 'username', 'email', 'password1', and 'password2'.
        """
        model = User
        fields = ['username', 'email', 'password1', 'password2']
