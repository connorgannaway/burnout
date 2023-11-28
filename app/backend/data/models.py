from django.db import models
from django.utils import timezone


# Create your models here.
# Models that don't have a primary_key=true statement use the standard django id field
class Disciplines(models.Model):
    disciplineId = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    color = models.CharField(max_length=7, default="#C80815")
    
class Seasons(models.Model):
    seasonId = models.IntegerField(primary_key=True)
    year = models.IntegerField()
    url = models.CharField(max_length=255, blank=True, null=True)
    disciplineId = models.ForeignKey(Disciplines, db_column='disciplineId', on_delete=models.CASCADE)
    
class Constructors(models.Model):
    constructorId = models.IntegerField(primary_key=True)
    constructorRef = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255)
    nationality = models.CharField(max_length=255)
    url = models.CharField(max_length=255, blank=True, null=True)
    color = models.CharField(max_length=7, default="#C80815")
    
class Drivers(models.Model):
    driverId = models.IntegerField(primary_key=True)
    driverRef = models.BigIntegerField(blank=True, null=True)
    number = models.IntegerField(blank=True, null=True)
    code = models.CharField(max_length=3, blank=True, null=True)
    firstname = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    dob = models.DateField(blank=True, null=True)
    nationality = models.CharField(max_length=255)
    url = models.CharField(max_length=255, blank=True, null=True)
    color = models.CharField(max_length=7, default="#C80815")
    
class Circuits(models.Model):
    circuitId = models.IntegerField(primary_key=True)
    circuitRef = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=255, blank=True, null=True)
    lat = models.FloatField(blank=True, null=True)
    lng = models.FloatField(blank=True, null=True)
    alt = models.IntegerField(blank=True, null=True)
    url = models.CharField(max_length=255, blank=True, null=True)
    
class Races(models.Model):
    raceId = models.IntegerField(primary_key=True)
    seasonId = models.ForeignKey(Seasons, db_column='seasonId', on_delete=models.CASCADE)
    round = models.IntegerField(blank=True, null=True)
    circuitId = models.ForeignKey(Circuits,db_column='circuitId', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    date = models.DateField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)
    url = models.CharField(max_length=255, blank=True, null=True)
    fp1_date = models.DateField(blank=True, null=True)
    fp1_time = models.TimeField(blank=True, null=True)
    fp2_date = models.DateField(blank=True, null=True)
    fp2_time = models.TimeField(blank=True, null=True)
    fp3_date = models.DateField(blank=True, null=True)
    fp3_time = models.TimeField(blank=True, null=True)
    quali_date = models.DateField(blank=True, null=True)
    quali_time = models.TimeField(blank=True, null=True)
    sprint_date = models.DateField(blank=True, null=True)
    sprint_time = models.TimeField(blank=True, null=True)
    
class PitStops(models.Model):
    raceId = models.ForeignKey(Races,db_column='raceId', on_delete=models.CASCADE)
    driverId = models.ForeignKey(Drivers,db_column='driverId', on_delete=models.CASCADE)
    stop = models.IntegerField()
    lap = models.IntegerField()
    time = models.TimeField(blank=True, null=True)
    duration = models.FloatField(blank=True, null=True)
    milliseconds = models.IntegerField(blank=True, null=True)

class LapTimes(models.Model):
    raceId = models.ForeignKey(Races,db_column='raceId', on_delete=models.CASCADE)
    driverId = models.ForeignKey(Drivers,db_column='driverId', on_delete=models.CASCADE)
    lap = models.IntegerField()
    position = models.IntegerField(blank=True, null=True)
    time = models.FloatField(blank=True, null=True)
    milliseconds = models.IntegerField(blank=True, null=True)

class Status(models.Model):
    statusId = models.IntegerField(primary_key=True)
    status = models.CharField(max_length=255)

class DriverStandings(models.Model):
    driverStandingsId = models.IntegerField(primary_key=True)
    raceId = models.ForeignKey(Races,db_column='raceId', on_delete=models.CASCADE)
    driverId = models.ForeignKey(Drivers,db_column='driverId', on_delete=models.CASCADE)
    points = models.FloatField()
    position = models.IntegerField()
    positionText = models.CharField(max_length=255, blank=True, null=True)
    wins = models.IntegerField(blank=True, null=True)

class ConstructorStandings(models.Model):
    constructorStandingsId = models.IntegerField(primary_key=True)
    raceId = models.ForeignKey(Races,db_column='raceId', on_delete=models.CASCADE)
    constructorId = models.ForeignKey(Constructors,db_column='constructorId', on_delete=models.CASCADE)
    points = models.FloatField()
    position = models.IntegerField()
    positionText = models.CharField(max_length=255, blank=True, null=True)
    wins = models.IntegerField(blank=True, null=True)

class ConstructorResults(models.Model):
    constructorResultsId = models.IntegerField(primary_key=True)
    raceId = models.ForeignKey(Races,db_column='raceId', on_delete=models.CASCADE)
    constructorId = models.ForeignKey(Constructors,db_column='constructorId', on_delete=models.CASCADE)
    points = models.FloatField()
    status = models.CharField(max_length=255, blank=True, null=True)

class Qualifying(models.Model):
    qualifyid = models.IntegerField(primary_key=True)
    raceId = models.ForeignKey(Races,db_column='raceId', on_delete=models.CASCADE)
    driverId = models.ForeignKey(Drivers,db_column='driverId', on_delete=models.CASCADE)
    constructorId = models.ForeignKey(Constructors,db_column='constructorId', on_delete=models.CASCADE)
    number = models.IntegerField(blank=True, null=True)
    position = models.IntegerField(blank=True, null=True)
    q1 = models.IntegerField(blank=True, null=True)
    q2 = models.IntegerField(blank=True, null=True)
    q3 = models.IntegerField(blank=True, null=True)
    
class SprintResults(models.Model):
    sprintResultId = models.IntegerField(primary_key=True)
    raceId = models.ForeignKey(Races,db_column='raceId', on_delete=models.CASCADE)
    driverId = models.ForeignKey(Drivers,db_column='driverId', on_delete=models.CASCADE)
    constructorId = models.ForeignKey(Constructors,db_column='constructorId', on_delete=models.CASCADE)
    number = models.IntegerField(blank=True, null=True)
    grid = models.IntegerField(blank=True, null=True)
    position = models.IntegerField(blank=True, null=True)
    positionText = models.CharField(max_length=255, blank=True, null=True)
    positionOrder = models.IntegerField(blank=True, null=True)
    points = models.FloatField(blank=True, null=True)
    laps = models.IntegerField(blank=True, null=True)
    time = models.CharField(max_length=255, blank=True, null=True)
    milliseconds = models.IntegerField(blank=True, null=True)
    fastestLap = models.IntegerField(blank=True, null=True)
    fastestLapTime = models.CharField(max_length=255, blank=True, null=True)
    statusId = models.ForeignKey(Status, db_column='statusId', blank=True, null=True, on_delete=models.DO_NOTHING)

class Results(models.Model):
    resultId = models.IntegerField(primary_key=True)
    raceId = models.ForeignKey(Races,db_column='raceId', on_delete=models.CASCADE)
    driverId = models.ForeignKey(Drivers,db_column='driverId', on_delete=models.CASCADE)
    constructorId = models.ForeignKey(Constructors,db_column='constructorId', on_delete=models.CASCADE)
    number = models.IntegerField(blank=True, null=True)
    grid = models.IntegerField(blank=True, null=True)
    position = models.IntegerField(blank=True, null=True)
    positionText = models.CharField(max_length=255,blank=True, null=True)
    positionOrder = models.IntegerField(blank=True, null=True)
    points = models.FloatField(blank=True, null=True)
    laps = models.IntegerField(blank=True, null=True)
    time = models.CharField(max_length=255,blank=True, null=True)
    milliseconds = models.IntegerField(blank=True, null=True)
    fastestLap = models.IntegerField(blank=True, null=True)
    rank = models.IntegerField(blank=True, null=True)
    fastestLapTime = models.CharField(max_length=255,blank=True, null=True)
    fastestLapSpeed = models.CharField(max_length=255,blank=True, null=True)
    statusId = models.ForeignKey(Status, db_column='statusId',blank=True, null=True, on_delete=models.DO_NOTHING)

class Messages(models.Model):
    enabled = models.BooleanField()
    title = models.CharField(max_length=100)
    message = models.CharField(max_length=255)

    # django will handle these fields since auto_now(_add) is true.
    # anything passed will be ignored upon Model.save()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
