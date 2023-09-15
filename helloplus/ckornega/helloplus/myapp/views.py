from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    return HttpResponse("Hello world plus")

def helloplus(request):
    return HttpResponse("I creted another page")

def helloworld(request):
    return render(request, "index.html")
# Create your views here.
