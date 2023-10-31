"""
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from . import views
urlpatterns = [
    path('messages/', views.Message.as_view()),
    path('messages/<int:pk>/', views.MessageDetail.as_view()),
    path('races/<int:pk>/brief/', views.RaceBrief.as_view()),
    path('races/nearest/', views.RaceIds.as_view()),
    path('teams/', views.Teams.as_view()),
    path('races/<int:pk>/', views.Race.as_view()),
    path('leagues/', views.AllLeagues.as_view()),
    path('leagues/<int:pk>/', views.League.as_view()),
    path('drivers/', views.DriversView.as_view()),
    path('drivers/<int:pk>/', views.Driver.as_view()),
]