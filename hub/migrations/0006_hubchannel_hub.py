# Generated by Django 5.1.4 on 2024-12-15 01:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hub', '0005_remove_hubchannel_hub'),
    ]

    operations = [
        migrations.AddField(
            model_name='hubchannel',
            name='hub',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='hub.hub'),
            preserve_default=False,
        ),
    ]
