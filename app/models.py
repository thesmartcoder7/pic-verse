from django.db import models
from django.contrib.auth.models import User



class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts', unique=False)
    image = models.ImageField(upload_to='post_images/', blank=True)
    name = models.CharField(max_length=20)
    caption = models.TextField()

    def __str__(self) -> str:
        return f"{self.name}"


class Comment(models.Model):
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post=models.ForeignKey(Post, on_delete=models.CASCADE, null=True)

    def __str__(self) -> str:
        return f"{self.post} Comment"



class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)

    def __str__(self) -> str:
        return f"{self.user.username} Likes"










