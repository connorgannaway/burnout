# Generated by Django 4.2.5 on 2023-11-28 18:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='constructors',
            name='color',
            field=models.CharField(default='#C80815', max_length=7),
        ),
        migrations.AddField(
            model_name='disciplines',
            name='color',
            field=models.CharField(default='#C80815', max_length=7),
        ),
        migrations.AddField(
            model_name='drivers',
            name='color',
            field=models.CharField(default='#C80815', max_length=7),
        ),
    ]
