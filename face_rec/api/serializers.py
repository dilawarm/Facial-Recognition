from rest_framework import serializers
from .models import Identity, Upload

class IdentitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Identity
        fields = '__all__'

class UploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Upload
        fields = '__all__'