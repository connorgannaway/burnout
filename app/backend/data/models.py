from django.db import models

# Create your models here.

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