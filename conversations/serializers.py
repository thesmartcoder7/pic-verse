from rest_framework import serializers
from conversations.models import *


class DMSerializer(serializers.ModelSerializer):
    class Meta:
        model = DirectMessage
        field = '__all__'
