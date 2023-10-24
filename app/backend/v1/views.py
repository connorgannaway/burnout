from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.utils import timezone
from django.db.models import F

from .serializers import *

# Create your views here.

# /v1/messages
# GET: Return all enabled messages, or all messages if /?all=true
# POST: Create a new message
class Message(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, format=None):
        # this if has to be in a try block. exception thrown if the param doesn't exist.
        try:
            if request.query_params['all'].lower() == "true":
                messages = Messages.objects.all().order_by('-enabled')
            else:
                messages = Messages.objects.filter(enabled=True)
        except:
            messages = Messages.objects.filter(enabled=True)

        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


# /v1/messages/<int:pk>/
# GET: View an individual message
# PUT: Update a message
class MessageDetail(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, pk, format=None):
        try:
            message = Messages.objects.get(pk=pk)
        except Messages.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = MessageSerializer(message)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        try:
            message = Messages.objects.get(pk=pk)
        except Messages.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = MessageSerializer(message, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

# /v1/races/<int:pk>/brief/
# given a race id, return a future/live/completed var, name, date,
# time, track, & top 3 qualifiers or finishers if available
class RaceBrief(APIView):
    def get(self, request, pk, format=None):
        try:
            race = Races.objects.get(raceId=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        data = {
            "raceId": race.raceId,
            "name": race.name,
            "date": race.date,
            "time": race.time,
            "track": race.circuitId.name,
        }

        now = timezone.now()
        date = now.date()
        time = now.time()

        if date < race.quali_date:
            data["rstatus"] = "Upcoming"
        elif date < race.date or (date == race.date and time < race.time):
            data["rstatus"] = "Qualified"
            finishers = race.qualifying_set.all().order_by(F('position').asc(nulls_last=True))[:3]
            data["grid"] = [
                {
                    "position": finisher.position,
                    "number": finisher.number,
                    "name": finisher.driverId.surname,
                    "code": finisher.driverId.code,
                    "constructor": finisher.constructorId.name,
                    "time": finisher.q1
                } for finisher in finishers
            ]

        else:
            data["rstatus"] = "Completed"
            finishers = race.results_set.all().order_by(F('position').asc(nulls_last=True))[:3]
            data["grid"] = [
                {
                    "position": finisher.position,
                    "number": finisher.number,
                    "name": finisher.driverId.surname,
                    "code": finisher.driverId.code,
                    "constructor": finisher.constructorId.name,
                    "time": finisher.time
                } for finisher in finishers
            ]

        return Response(data, status=status.HTTP_200_OK)

# This returns the nearest races from the current date, or date given.
class RaceIds(APIView):
    def get(self, request, format=None):
        try:
            targetdate = request.query_params['date']
        except:
            targetdate = timezone.now().date()

        today = Races.objects.filter(date=targetdate).values_list('raceId', flat=True)
        greater = Races.objects.filter(date__gt=targetdate).order_by('date')[:10].values_list('raceId', flat=True)
        less = Races.objects.filter(date__lt=targetdate).order_by('-date')[:10].values_list('raceId', flat=True)

        data = {
            "today": today,
            "future": greater,
            "past": less
        }
        print(targetdate)
        return Response(data=data, status=status.HTTP_200_OK)
 
 
class Teams(APIView):
    def get(self, request, format=None):
        try:
            year = request.query_params['year']
        except:
            year = timezone.now().date().strftime("%Y")
        try:
            season = Seasons.objects.filter(year=year).values_list('seasonId', flat=True)[0]
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        raceId = Races.objects.filter(seasonId=season).values_list('raceId', flat=True)[::-1][0]
        standings = ConstructorResults.objects.filter(raceId=raceId).values_list('constructorId', flat=True)
        teams = Constructors.objects.filter(constructorId__in=standings).order_by('constructorId').values_list('name', flat=True)
        points = ConstructorStandings.objects.filter(raceId=raceId).order_by('constructorId').values_list('points', flat=True)
        data = [{'team': team, 'points': points} for team,points in zip(teams,points)]
        data.sort(key=lambda x: x['points'], reverse=True)
        # data = ConstructorResults.objects.filter(constructorId__in=standings)#.select_related('name').order_by('constructorId')
        # data = StandingsSerializer(data).data
        return Response(data, status=status.HTTP_200_OK)