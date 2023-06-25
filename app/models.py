from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    """
    Model representing a post.

    Contains fields for the user, image, name, caption,
    number of comments, and number of likes.

    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts', unique=False)
    image = models.ImageField(upload_to='post_images/', blank=True)
    name = models.CharField(max_length=20)
    caption = models.TextField()
    comments = models.IntegerField(default=0, blank=True)
    likes = models.IntegerField(default=0, blank=True)

    def __str__(self) -> str:
        """
        Returns a string representation of the post.

        """
        return f"{self.name}"

    def save_post(self):
        """
        Saves the post to the database.

        """
        self.save()

    def delete_post(self):
        """
        Deletes the post from the database.

        """
        self.delete()

    def update_post(self, image, caption, name):
        """
        Updates the post with new image, caption, and name.

        """
        self.image = image
        self.name = name
        self.caption = caption
        self.save()


class Comment(models.Model):
    """
    Model representing a comment.

    Contains fields for the content, user, and the post it belongs to.

    """
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post=models.ForeignKey(Post, on_delete=models.CASCADE, null=True)

    def __str__(self) -> str:
        """
        Returns a string representation of the comment.

        """
        return f"{self.post} Comment"

    def save_comment(self):
        """
        Saves the comment to the database.

        """
        self.save()

    def delete_comment(self):
        """
        Deletes the comment from the database.

        """
        self.delete()


class Like(models.Model):
    """
    Model representing a like.

    Contains fields for the user who liked the post and the post itself.

    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_like')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_likes', default=0)

    def __str__(self) -> str:
        """
        Returns a string representation of the like.

        """
        return f"{self.user.username} Likes"

    def save_like(self):
        """
        Saves the like to the database.

        """
        self.save()

    def delete_like(self):
        """
        Deletes the like from the database.

        """
        self.delete()
