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


class DisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplines
        fields = '__all__'

        
class DriversSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drivers
        fields = '__all__'
