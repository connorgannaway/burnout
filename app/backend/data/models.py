from django.db import models

# Create your models here.
# Models that don't have a primary_key=true statement use the standard django id field
class Disciplines(models.Model):
    disciplineId = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    
class Seasons(models.Model):
    seasonId = models.IntegerField(primary_key=True)
    year = models.IntegerField()
    url = models.CharField(max_length=255)
    disciplineId = models.ForeignKey(Disciplines, db_column='disciplineId', on_delete=models.CASCADE)
    
class Constructors(models.Model):
    contructorId = models.IntegerField(primary_key=True)
    constructorRef = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    nationality = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    
class Drivers(models.Model):
    driverId = models.IntegerField(primary_key=True)
    driverRef = models.BigIntegerField()
    number = models.IntegerField()
    code = models.CharField(max_length=3)
    firstname = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    dob = models.DateField()
    nationality = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    
class Circuits(models.Model):
    circuitId = models.IntegerField(primary_key=True)
    circuitRef = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    lat = models.FloatField()
    lng = models.FloatField()
    alt = models.IntegerField()
    url = models.CharField(max_length=255)
    
class Races(models.Model):
    raceId = models.IntegerField(primary_key=True)
    seasonId = models.ForeignKey(Seasons, db_column='seasonId', on_delete=models.CASCADE)
    round = models.IntegerField()
    circuitId = models.ForeignKey(Circuits,db_column='circuitId', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField()
    url = models.CharField(max_length=255)
    fp1_date = models.DateField()
    fp1_time = models.TimeField()
    fp2_date = models.DateField()
    fp2_time = models.TimeField()
    fp3_date = models.DateField()
    fp3_time = models.TimeField()
    quali_date = models.DateField()
    quali_time = models.TimeField()
    sprint_date = models.DateField()
    sprint_time = models.TimeField()
    
class PitStops(models.Model):
    raceId = models.ForeignKey(Races,db_column='raceId', on_delete=models.CASCADE)
    driverId = models.ForeignKey(Drivers,db_column='driverId', on_delete=models.CASCADE)
    stop = models.IntegerField()
    lap = models.IntegerField()
    time = models.TimeField()
    duration = models.FloatField()
    milliseconds = models.IntegerField()

class LapTimes(models.Model):
    raceId = models.ForeignKey(Races,db_column='raceId', on_delete=models.CASCADE)
    driverId = models.ForeignKey(Drivers,db_column='driverId', on_delete=models.CASCADE)
    lap = models.IntegerField()
    position = models.IntegerField()
    time = models.FloatField()
    milliseconds = models.IntegerField()

class Status(models.Model):
    statusId = models.IntegerField(primary_key=True)
    status = models.CharField(max_length=255)

class DriverStandings(models.Model):
    driverStandingsId = models.IntegerField(primary_key=True)
    raceId = models.ForeignKey(Races,db_column='raceId', on_delete=models.CASCADE)
    driverId = models.ForeignKey(Drivers,db_column='driverId', on_delete=models.CASCADE)
    points = models.FloatField()
    position = models.IntegerField()
    positionText = models.CharField(max_length=255)
    wins = models.IntegerField()

class ConstructorStandings(models.Model):
    constructorStandingsId = models.IntegerField(primary_key=True)
    raceId = models.ForeignKey(Races,db_column='raceId', on_delete=models.CASCADE)
    driverId = models.ForeignKey(Drivers,db_column='driverId', on_delete=models.CASCADE)
    points = models.FloatField()
    position = models.IntegerField()
    positionText = models.CharField(max_length=255)
    wins = models.IntegerField()

class ConstructorResults(models.Model):
    constructorResultsId = models.IntegerField(primary_key=True)
    raceId = models.ForeignKey(Races,db_column='raceId', on_delete=models.CASCADE)
    constructorId = models.ForeignKey(Constructors,db_column='constructorId', on_delete=models.CASCADE)
    points = models.FloatField()
    status = models.CharField(max_length=255)

class Qualifying(models.Model):
    qualifyid = models.IntegerField(primary_key=True)
    raceId = models.ForeignKey(Races,db_column='raceId', on_delete=models.CASCADE)
    driverId = models.ForeignKey(Drivers,db_column='driverId', on_delete=models.CASCADE)
    constructorId = models.ForeignKey(Constructors,db_column='constructorId', on_delete=models.CASCADE)
    number = models.IntegerField()
    position = models.IntegerField()
    q1 = models.IntegerField()
    q2 = models.IntegerField()
    q3 = models.IntegerField()
    
class SprintResults(models.Model):
    sprintResultId = models.IntegerField(primary_key=True)
    raceId = models.ForeignKey(Races,db_column='raceId', on_delete=models.CASCADE)
    driverId = models.ForeignKey(Drivers,db_column='driverId', on_delete=models.CASCADE)
    constructorId = models.ForeignKey(Constructors,db_column='constructorId', on_delete=models.CASCADE)
    number = models.IntegerField()
    grid = models.IntegerField()
    position = models.IntegerField()
    positionText = models.CharField(max_length=255)
    positionOrder = models.IntegerField()
    points = models.FloatField()
    laps = models.IntegerField()
    time = models.CharField(max_length=255)
    milliseconds = models.IntegerField()
    fastestLap = models.IntegerField()
    fastestLapTime = models.CharField(max_length=255)
    statusId = models.IntegerField()

class Results(models.Model):
    resultId = models.IntegerField(primary_key=True)
    raceId = models.ForeignKey(Races,db_column='raceId', on_delete=models.CASCADE)
    driverId = models.ForeignKey(Drivers,db_column='driverId', on_delete=models.CASCADE)
    constructorId = models.ForeignKey(Constructors,db_column='constructorId', on_delete=models.CASCADE)
    number = models.IntegerField()
    grid = models.IntegerField()
    position = models.IntegerField()
    positionText = models.CharField(max_length=255)
    positionOrder = models.IntegerField()
    points = models.FloatField()
    laps = models.IntegerField()
    time = models.CharField(max_length=255)
    milliseconds = models.IntegerField()
    fastestLap = models.IntegerField()
    rank = models.IntegerField()
    fastestLapTime = models.CharField(max_length=255)
    fastestLapSpeed = models.CharField(max_length=255)
    statusId = models.IntegerField()
