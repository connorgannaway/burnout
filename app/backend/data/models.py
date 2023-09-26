from django.db import models

# Create your models here.
# Models that don't have a primary_key=true statement use the standard django id field
class PitStops(models.Model):
    raceId = models.ForeignKey(Races, on_delete=models.CASCADE)
    driverId = models.ForeignKey(Drivers, on_delete=models.CASCADE)
    stop = models.IntegerField()
    lap = models.IntegerField()
    time = models.TimeField()
    duration = models.FloatField()
    milliseconds = models.IntegerField()


class LapTimes(models.Model):
    raceId = models.ForeignKey(Races, on_delete=models.CASCADE)
    driverId = models.ForeignKey(Drivers, on_delete=models.CASCADE)
    lap = models.IntegerField()
    position = models.IntegerField()
    time = models.FloatField()
    milliseconds = models.IntegerField()

class Status(models.Model):
    statusId = models.IntegerField(primary_key=True)
    status = models.CharField(max_length=255)

class DriverStandings(models.Model):
    driverStandingsId = models.IntegerField(primary_key=True)
    raceId = models.ForeignKey(Races, on_delete=models.CASCADE)
    driverId = models.ForeignKey(Drivers, on_delete=models.CASCADE)
    points = models.FloatField()
    position = models.IntegerField()
    positionText = models.CharField(max_length=255)
    wins = models.IntegerField()

class ConstructorStandings(models.Model):
    constructorStandingsId = models.IntegerField(primary_key=True)
    raceId = models.ForeignKey(Races, on_delete=models.CASCADE)
    driverId = models.ForeignKey(Drivers, on_delete=models.CASCADE)
    points = models.FloatField()
    position = models.IntegerField()
    positionText = models.CharField(max_length=255)
    wins = models.IntegerField()

class ConstructorResults(models.Model):
    constructorResultsId = models.IntegerField(primary_key=True)
    raceId = models.ForeignKey(Races, on_delete=models.CASCADE)
    constructorId = models.ForeignKey(Constructors, on_delete=models.CASCADE)
    points = models.FloatField()
    status = models.CharField(max_length=255)
    
class Disciplines(models.Model):
    disciplineId = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    
class Seasons(models.Model):
    year = models.IntegerField(primar_key=True)
    url = models.CharField(max_length=255)
    disciplineId = models.ForeignKey(Disciplines, on_delete=models.CASCADE)

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