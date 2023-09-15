from django.db import models

class myapp(models.Model):
    name = models.CharField(max_length=25, blank=True, null=True)
    image_url = models.CharField(max_length=25, blank=True, null=True)
# Create your models here.
