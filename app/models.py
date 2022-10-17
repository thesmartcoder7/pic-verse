from django.db import models
from django.contrib.auth.models import User



class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts', unique=False)
    image = models.ImageField(upload_to='post_images/', blank=True)
    name = models.CharField(max_length=20)
    caption = models.TextField()
    comments = models.IntegerField(default=0, blank=True)
    likes = models.IntegerField(default=0, blank=True)

    def __str__(self) -> str:
        return f"{self.name}"

    def save_post(self):
        self.save()

    def delete_post(self):
        self.delete()

    def update_post(self, image, caption, name):
        self.image = image
        self.name = name
        self.caption = caption
        self.save()



class Comment(models.Model):
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post=models.ForeignKey(Post, on_delete=models.CASCADE, null=True)

    def __str__(self) -> str:
        return f"{self.post} Comment"

    def save_comment(self):
        self.save()

    def delete_comment(self):
        self.delete()



class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_like')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_likes', default=0)

    def __str__(self) -> str:
        return f"{self.user.username} Likes"

    def save_like(self):
        self.save()

    def delete_like(self):
        self.delete()












