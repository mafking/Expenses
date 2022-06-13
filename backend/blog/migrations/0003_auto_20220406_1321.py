# Generated by Django 3.2.12 on 2022-04-06 12:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_tracker'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tracker',
            name='title',
        ),
        migrations.AddField(
            model_name='tracker',
            name='priority',
            field=models.BooleanField(default=True),
        ),
    ]