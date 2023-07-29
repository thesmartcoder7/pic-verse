from django.db import models
from users.models import User


class Thread(models.Model):
    participants = models.ManyToManyField(User, related_name='threads')
    # Add any other fields, such as a timestamp for the last message in the thread

    def __str__(self):
        return f"Thread {self.id}"


class DirectMessage(models.Model):
    thread = models.ForeignKey(
        Thread, on_delete=models.CASCADE, related_name='messages')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return str(self.author).title()
