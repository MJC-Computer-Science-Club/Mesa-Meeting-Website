# Generated by Django 5.1.4 on 2024-12-14 23:07

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hub', '0003_message'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='hub',
        ),
        migrations.CreateModel(
            name='HubChannel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('hub', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hub.hub')),
            ],
        ),
    ]