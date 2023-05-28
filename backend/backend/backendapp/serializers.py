from rest_framework import serializers
from .models import IG, Slot

class IGSerializer(serializers.ModelSerializer):
    class Meta:
        model = IG
        fields = ['id', 'name', 'category']

class SlotSerializer(serializers.ModelSerializer):
    ig = serializers.SlugRelatedField(
        slug_field = 'name',
        queryset = IG.objects.all(),
    )

    class Meta:
        model = Slot
        fields = ['id', 'venue', 'capacity', 'startDateTime', 'endDateTime', 'description', 'ig']