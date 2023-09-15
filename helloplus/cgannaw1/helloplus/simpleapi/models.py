from django.db import models

# Create your models here.

class Person(models.Model):
    FirstName = models.CharField(max_length=50)
    LastName = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.FirstName} {self.LastName}"