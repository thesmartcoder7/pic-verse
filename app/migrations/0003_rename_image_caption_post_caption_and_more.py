# Generated by Django 4.0.5 on 2022-06-07 21:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_remove_post_comment_remove_post_like_comment_post_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='image_caption',
            new_name='caption',
        ),
        migrations.RenameField(
            model_name='post',
            old_name='image_path',
            new_name='image',
        ),
        migrations.RenameField(
            model_name='post',
            old_name='image_name',
            new_name='name',
        ),
    ]