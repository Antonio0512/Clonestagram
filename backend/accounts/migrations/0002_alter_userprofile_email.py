# Generated by Django 4.2.6 on 2023-10-24 12:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='email',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]