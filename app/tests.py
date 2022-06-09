from django.test import TestCase

from django.contrib.auth.models import User

from .models import *



# Create your tests here.

class PostTestClass(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='samuel', email='samuel.martins3.sm@gmail.com', password='thesmartcoder')
        self.post = Post.objects.create(user=self.user, image='default.ong', name='my image', caption='everything is about to change' )
    
    def test_instance(self):
        self.assertTrue(isinstance(self.post,Post))

    def test_save(self): 
        self.user.save()
        all_posts = Post.objects.all()
        self.assertEquals(len(all_posts),1)

    def test_delete(self):
        self.user.save()
        self.new_post = Post.objects.create(user=self.user, image='default.ong', name='my image', caption='everything is about to change' )
        self.new_post.save()
        self.new_post.delete()
        all_posts = Post.objects.all()
        self.assertEquals(len(all_posts),1)


class CommentTestClass(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='samuel', email='samuel.martins3.sm@gmail.com', password='thesmartcoder')
        self.post = Post.objects.create(user=self.user, image='default.ong', name='my image', caption='everything is about to change')
        self.comment = Comment.objects.create(user=self.user, post=self.post, content='simple comment')  

    def test_instance(self):
        self.assertTrue(isinstance(self.comment,Comment))

    def test_save(self):
        self.new_comment = Comment.objects.create(user=self.user, post=self.post, content='simple comment')
        self.comment.save()
        all_comments = Comment.objects.all()
        self.assertEquals(len(all_comments),2)

    def test_delete(self):
        self.new_comment = Comment.objects.create(user=self.user, post=self.post, content='simple comment')
        self.new_comment.save()
        self.new_comment.delete()
        all_comments = Comment.objects.all()
        self.assertEquals(len(all_comments),1)



class LikeTestClass(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='samuel', email='samuel.martins3.sm@gmail.com', password='thesmartcoder')
        self.post = Post.objects.create(user=self.user, image='default.ong', name='my image', caption='everything is about to change')
        self.like = Like.objects.create(user=self.user, post=self.post)  

    def test_instance(self):
        self.assertTrue(isinstance(self.like, Like))

    def test_save(self):
        all_likes = Like.objects.all()
        self.assertEquals(len(all_likes),1)