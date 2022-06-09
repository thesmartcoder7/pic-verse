from django.test import TestCase

from django.contrib.auth.models import User

from .models import *



# Create your tests here.

class UserTestClass(TestCase):
    def setUp(self):
        self.new_user = User.objects.create( username='samuel', email='samuel.martins3.sm@gmail.com', password='thesmartcoder' )
    
    def test_instance(self):
        self.assertTrue(isinstance(self.new_user,User))

    def test_save(self):
        self.new_user.save()
        all_users = User.objects.all()
        self.assertEquals(len(all_users),1)

    def test_delete(self):
        self.new_user.save()
        test_user = User(username = 'simple_user',password='testuser123',email='testuser@domain.com')
        test_user.save()
        self.new_user.delete()
        all_users = User.objects.all()
        self.assertEquals(len(all_users),1)


class ProfileTestClass(TestCase):
    def setUp(self):
        self.new_user = User.objects.create( username='samuel', email='samuel.martins3.sm@gmail.com', password='thesmartcoder' )
        self.new_user.save()
        self.new_profile = Profile.objects.filter(user=self.new_user).first()

    def test_instance(self):
        self.assertTrue(isinstance(self.new_profile,Profile))

    def test_save_profile(self):
        self.another_user = User.objects.create( username='tom', email='tom.sm@gmail.com', password='thesmartcoder' )
        self.another_user.save()
        self.another_profile = Profile.objects.filter(user=self.new_user).first()
        all_profiles = Profile.objects.all()
        self.assertEquals(len(all_profiles),2)

    def test_delete_profile(self):
        self.dean_user = User.objects.create(username='dean', password='deantheman', email='dean@domain.com')
        self.dean_user.save()
        self.dean_profile = Profile.objects.filter(user=self.dean_user).first()
        self.dean_user.delete()
        all_profiles = Profile.objects.all()
        self.assertEquals(len(all_profiles),1)



class FollowTestClass(TestCase):
    def setUp(self):
        self.user1 = User.objects.create(username='user1', password='user1', email='user1@user.com')
        self.user1.save()
        self.user1_profile = Profile.objects.filter(user=self.user1).first()


        self.user2 = User.objects.create(username='user2', password='user2', email='user2@user.com')
        self.user1.save()
        self.user2_profile = Profile.objects.filter(user=self.user2).first()


    def test_instance(self):
        self.new_follow = Follow(follower=self.user1_profile, following = self.user2_profile)
        self.assertTrue(isinstance(self.new_follow,Follow))

    
    def test_follow(self):
        self.follow = Follow(follower=self.user1_profile, following=self.user2_profile)
        self.follow.save()
        all_follows = Follow.objects.all()

        self.assertEquals(len(all_follows),1)