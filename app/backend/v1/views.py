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

'''
given a race id, return a future/live/completed var,
************************Future/live:************************
name, track, date & session times, starting grid with interval times if available
********************Completed:********************
name, track, date & session times, finishing grid with interval times:
 driver name, number, points earned, total points, if driver has fastest lap
Another similar grid with sprint data if its a sprint race weekend.
'''
class Race(APIView):

    def positionTextConversion(self, string):
        if string == 'D':
            return 'Disqualified'
        elif string == 'E':
            return 'Excluded'
        elif string == 'F':
            return 'Failed to Qualify'
        elif string == 'N':
            return 'Not Classified'
        elif string == 'R':
            return 'Retired'
        elif string == 'W':
            return 'Withdrew'
        else:
            return string


    def get(self, request, pk, format=None):

        # find race from passed pk
        try:
            race = Races.objects.get(raceId=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # add general data
        data = {
            "raceId": race.raceId,
            "name": race.name,
            "quali_date": race.quali_date,
            "quali_time": race.quali_time,
            "date": race.date,
            "time": race.time,
            "fp1_date": race.fp1_date,
            "fp1_time": race.fp1_time,
            "fp2_date": race.fp2_date,
            "fp2_time": race.fp2_time,
            "fp3_date": race.fp3_date,
            "fp3_time": race.fp3_time,
            "sprint_date": race.sprint_date,
            "sprint_time": race.sprint_time,
            "round": race.round,
            "track": race.circuitId.name,
            "location": race.circuitId.location,
            "country": race.circuitId.country,
        }

        now = timezone.now()
        date = now.date()
        time = now.time()

        # check for sprint weekend
        sprintresults = race.sprintresults_set.all().order_by(F('positionOrder').asc(nulls_last=True))
        if not sprintresults:
            data['is_sprint_weekend'] = False

        else:
            data['is_sprint_weekend'] = True
            if date > race.sprint_date or (date == race.sprint_date and time >= race.sprint_time):
                data["sprint_grid"] = [
                    {
                        "position": self.positionTextConversion(finisher.positionText),
                        "number": finisher.number,
                        "name": finisher.driverId.surname,
                        "code": finisher.driverId.code,
                        "constructor": finisher.constructorId.name,
                        "time": finisher.time,
                        "status": finisher.statusId.status,
                        "points": finisher.points,
                        "laps": finisher.laps,
                        "startingPosition": finisher.grid,

                    } for finisher in sprintresults
                ]

        # Set race status based on time. Include Qualifying or Completed grids if available.
        if date < race.quali_date:
            data['rstatus'] = 'Upcoming'
            return Response(data=data, status=status.HTTP_200_OK)

        elif date < race.date or (date == race.date and time < race.time):
            data['rstatus'] = 'Qualified'

            finishers = race.qualifying_set.all().order_by(F('position').asc(nulls_last=True))
            data["grid"] = [
                {
                    "position": finisher.position,
                    "number": finisher.number,
                    "name": finisher.driverId.surname,
                    "code": finisher.driverId.code,
                    "constructor": finisher.constructorId.name,
                    "q1": finisher.q1,
                    "q2": finisher.q2,
                    "q3": finisher.q3,
                } for finisher in finishers
            ]

            return Response(data=data, status=status.HTTP_200_OK)
        else:
            data['rstatus'] = 'Completed'

            finishers = race.results_set.all().order_by(F('positionOrder').asc(nulls_last=True))

            data["grid"] = [
                {
                    "position": self.positionTextConversion(finisher.positionText),
                    "number": finisher.number,
                    "name": finisher.driverId.surname,
                    "code": finisher.driverId.code,
                    "constructor": finisher.constructorId.name,
                    "time": finisher.time,
                    "status": finisher.statusId.status,
                    "points": finisher.points,
                    "laps": finisher.laps,
                    "startingPosition": finisher.grid,

                } for finisher in finishers
            ]

            return Response(data=data, status=status.HTTP_200_OK)

class DriversView(APIView):
    def get(self, request, format=None):
        try:
            drivers = Drivers.objects.all()
            serializer = DriversSerializer(drivers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)