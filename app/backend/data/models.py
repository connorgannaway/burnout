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
