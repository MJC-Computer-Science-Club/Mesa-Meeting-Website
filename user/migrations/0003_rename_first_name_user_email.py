# Generated by Django 5.1.4 on 2024-12-06 01:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_remove_user_last_name_user_password_user_username'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='first_name',
            new_name='email',
        ),
    ]