from rest_framework import serializers
from .models import Identity

class IdentitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Identity
        fields = '__all__'