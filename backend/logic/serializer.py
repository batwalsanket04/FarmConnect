from .models import Farmer,Buyer
from rest_framework import serializers

class FarmerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Farmer
        fields= '__all__'


class BuyerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Buyer
        fields='__all__'