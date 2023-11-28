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
            "color": race.seasonId.disciplineId.color,
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
                    "driverId": finisher.driverId,
                    "name": finisher.driverId.surname,
                    "code": finisher.driverId.code,
                    "constructor": finisher.constructorId.name,
                    "color": finisher.constructorId.color,
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
                    "driverId": finisher.driverId,
                    "name": finisher.driverId.surname,
                    "code": finisher.driverId.code,
                    "constructor": finisher.constructorId.name,
                    "color": finisher.constructorId.color,
                    "time": finisher.time
                } for finisher in finishers
            ]

        return Response(data, status=status.HTTP_200_OK)

# /v1/races/nearest/
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
 

# /v1/teams/
class Teams(APIView):
    def get(self, request, format=None):
        try:
            year = request.query_params['year']
        except:
            year = timezone.now().date().strftime("%Y")
        season = Seasons.objects.filter(year=year).values_list('seasonId', flat=True)[0]
        raceId = Races.objects.filter(seasonId=season).values_list('raceId', flat=True)[::-1]
        #print(raceId[0])
        i = 0
        standings = ConstructorResults.objects.filter(raceId=raceId[i])
        while not len(standings):
            i += 1
            try:
                standings = ConstructorResults.objects.filter(raceId=raceId[i])
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
        standings = standings.values_list('constructorId', flat=True).order_by('constructorId')
        teams = Constructors.objects.filter(constructorId__in=standings).order_by('constructorId').values_list('name', flat=True)
        points = ConstructorStandings.objects.filter(raceId=raceId[i]).order_by('constructorId').values_list('points', flat=True)
        colors = Constructors.objects.filter(constructorId__in=standings).order_by('constructorId').values_list('color', flat=True)
        data = [{'id' : id, 'team': team, 'points': points, 'color':color} for id,team,points,color in zip(standings,teams,points,colors)]
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
# /v1/race/<int:pk>/
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
            "color": race.seasonId.disciplineId.color,
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
                        "driverId": finisher.driverId,
                        "name": finisher.driverId.surname,
                        "code": finisher.driverId.code,
                        "constructor": finisher.constructorId.name,
                        "time": finisher.time,
                        "status": finisher.statusId.status,
                        "points": finisher.points,
                        "laps": finisher.laps,
                        "startingPosition": finisher.grid,
                        "color": finisher.constructorId.color,

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
                    "driverId": finisher.driverId,
                    "name": finisher.driverId.surname,
                    "code": finisher.driverId.code,
                    "constructor": finisher.constructorId.name,
                    "color": finisher.constructorId.color,
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
                    "driverId": finisher.driverId,
                    "name": finisher.driverId.surname,
                    "code": finisher.driverId.code,
                    "constructor": finisher.constructorId.name,
                    "time": finisher.time,
                    "status": finisher.statusId.status,
                    "points": finisher.points,
                    "laps": finisher.laps,
                    "startingPosition": finisher.grid,
                    "color": finisher.constructorId.color,

                } for finisher in finishers
            ]

            return Response(data=data, status=status.HTTP_200_OK)



# /v1/leagues/
class AllLeagues(APIView):
    def get(self, request, format=None):
        disciplines = Disciplines.objects.all().order_by("disciplineId")
        #serializer = DisciplineSerializer(disciplines, many=True)
        data = [{
            "disciplineId": discipline.disciplineId,
            "name": discipline.name,
            "color": discipline.color,
        } for discipline in disciplines]
        return Response(data=data, status=status.HTTP_200_OK)


# /v1/leagues/<int:pk>/
class League(APIView):
    def calcDriverStatistics(self, driver, races, mostRecentRaceId):
        stats = dict()
        stats['points'] = driver.points
        stats['wins'] = driver.wins
        podiums = 0
        top5 = 0
        for raceid in races:
            if raceid == mostRecentRaceId:
                break
            try:
                result = Results.objects.get(raceId=raceid, driverId=driver.driverId)
            except:
                continue

            if result.position == None:
                continue
            if result.position <= 5:
                top5 += 1
                if result.position <= 3:
                    podiums += 1

        stats['podiums'] = podiums
        stats['top5'] = top5

        return stats

    def calcConstructorStatistics(self, constructor, races, mostRecentRaceId):
        stats = dict()
        stats['points'] = constructor.points
        stats['wins'] = constructor.wins
        podiums = 0
        top5 = 0
        for raceid in races:
            if raceid == mostRecentRaceId:
                break
            try:
                results = Results.objects.filter(raceId=raceid, constructorId=constructor.constructorId)
            except:
                continue

            for result in results:
                if result.position == None:
                    continue
                if result.position <= 5:
                    top5 += 1
                    if result.position <= 3:
                        podiums += 1

        stats['podiums'] = podiums
        stats['top5'] = top5

        return stats

    def get(self, request, pk, format=None):
        now = timezone.now()
        try:
            year = request.query_params['year']
        except:
            year = now.year

        try:
            #discipline = Disciplines.objects.get(disciplineId=pk)
            season = Seasons.objects.get(disciplineId=pk, year=year)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        races = season.races_set.all().order_by('date')
        data = {
            'races': [],
            'color': season.disciplineId.color
        }

        for race in races:
            data['races'].append(race.raceId)

        driverstandings = 0
        raceid = data['races'][-1]
        count = 0
        while driverstandings == 0:
            try:
                driverstandings = DriverStandings.objects.filter(raceId=raceid)
                if not driverstandings:
                    raceid -= 1
                    count += 1
                    driverstandings = 0
                    if (count > 25):
                        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except:
                driverstandings = 0
                raceid -= 1
                count += 1
                if (count > 25):
                    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        data['drivers'] = [{
            'driverId': driver.driverId.driverId,
            'position': driver.position,
            'code': driver.driverId.code,
            'firstname': driver.driverId.firstname,
            'surname': driver.driverId.surname,
            'nationality': driver.driverId.nationality,
            'color': driver.driverId.color,
            'statistics': self.calcDriverStatistics(driver, data['races'], raceid)
        } for driver in driverstandings]

        data['drivers'] = sorted(data['drivers'], key=lambda x: x['position'])

        try:
            constructorstandings = ConstructorStandings.objects.filter(raceId=raceid)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        data['constructors'] = [{
            'constructorId': constructor.constructorId.constructorId,
            'position': constructor.position,
            'name': constructor.constructorId.name,
            'nationality': constructor.constructorId.nationality,
            'color': constructor.constructorId.color,
            'stats': self.calcConstructorStatistics(constructor, data['races'], raceid)
        } for constructor in constructorstandings]

        data['constructors'] = sorted(data['constructors'], key=lambda x: x['position'])

        return Response(data=data, status=status.HTTP_200_OK)
    

class DriversView(APIView):
    def get(self, request, format=None):
        try:
            drivers = Drivers.objects.all()
            serializer = DriversSerializer(drivers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

# /v1/drivers/<int:pk>/
class Driver(APIView):
    def get(self, request, pk, format=None):
        try:
            driver = Drivers.objects.get(driverId=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        data = {
            "driverId": driver.driverId,
            "number": driver.number,
            "code": driver.code,
            "firstname": driver.firstname,
            "surname": driver.surname,
            "dob": driver.dob,
            "nationality": driver.nationality,
            "color": driver.color,
            "results": []
        }

        now = timezone.now()
        year = now.year

        found = False
        while 1:
            season = Seasons.objects.get(year=year)
            races = season.races_set.all().order_by('-date')
            driverstandings = 0
            raceid = races[0].raceId
            numraces = len(races)
            count = 0
            breakouter = False
            while driverstandings == 0:
                try:
                    driverstandings = DriverStandings.objects.get(raceId=raceid, driverId=driver.driverId)
                    found = True

                except:
                    driverstandings = 0
                    raceid -= 1
                    count += 1
                    if (count > numraces):
                        breakouter = True
                        break
                        #return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            if breakouter and found:
                break
            if not found:
                year -= 1
                continue

            try:
                result = Results.objects.get(raceId=raceid, driverId=driver.driverId)
                constructor = result.constructorId.name
            except:
                constructor = None

            data["results"].append({
                "year": year,
                "position": driverstandings.position,
                "wins": driverstandings.wins,
                "points": driverstandings.points,
                "constructor": constructor
            })

            year -= 1


        return Response(data=data, status=status.HTTP_200_OK)

class TeamDetail(APIView):
    def get(self, request, pk, format=None):
        try:
            constructor = Constructors.objects.get(constructorId=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        data = {
            "constructorId": constructor.constructorId,
            "name": constructor.name,
            "nationality": constructor.nationality,
            "color": constructor.color,
            "results": []
        }

        now = timezone.now()
        year = now.year

        found = False
        while 1:
            season = Seasons.objects.get(year=year)
            races = season.races_set.all().order_by('-date')
            constructorstandings = 0
            raceid = races[0].raceId
            numraces = len(races)
            count = 0
            breakouter = False
            while constructorstandings == 0:
                try:
                    constructorstandings = ConstructorStandings.objects.get(raceId=raceid, constructorId=constructor.constructorId)
                    found = True

                except:
                    constructorstandings = 0
                    raceid -= 1
                    count += 1
                    if (count > numraces):
                        breakouter = True
                        break
                        # return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            if breakouter and found:
                break
            if not found:
                year -= 1
                continue

            try:
                result = Results.objects.filter(raceId=raceid, constructorId=constructor.constructorId)
            except:
                result = []


            data["results"].append({
                "year": year,
                "position": constructorstandings.position,
                "wins": constructorstandings.wins,
                "points": constructorstandings.points,
                "drivers": [{
                    "driverId": driver.driverId.driverId,
                    "number": driver.number,
                    "code": driver.driverId.code,
                    "firstname": driver.driverId.firstname,
                    "surname": driver.driverId.surname,
                    "position": DriverStandings.objects.get(raceId=raceid, driverId=driver.driverId.driverId).position
                } for driver in result]
            })

            year -= 1

        return Response(data=data, status=status.HTTP_200_OK)
