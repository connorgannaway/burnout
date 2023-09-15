from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('api/person/', Persons.as_view()),
]