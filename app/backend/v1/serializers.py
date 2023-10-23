from rest_framework import serializers
from data.models import *

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = [
            'pk',
            'enabled',
            'title',
            'message',
            'created_at',
            'updated_at',
        ]

        # set these to non required so they don't need to be present
        # on POST/PUT. Django handles these behind the curtain.
        extra_kwargs = {
            "created_at": {"required": False},
            "updated_at": {"required": False},
        }
        
class TeamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Constructors
        fields = [
            'contructorId',
            'constructorRef',
            'name',
            'nationality',
            'url',
        ]
        # model = ConstructorResults
        # fields = [
        #     'constructorResultsId',
        #     'raceId',
        #     'constructorId',
        #     'points',
        # ]
        # if fields[4] == '\\N': # Need to match "\\N" somehow
        #     status = "Not finished"