from .models import Farmer
from rest_framework import serializers

class FarmerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Farmer
        fields= '__all__'