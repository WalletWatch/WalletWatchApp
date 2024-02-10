from rest_framework import serializers
from .models import Balance, Wallet, Network

class BalanceSerializer(serializers.ModelSerializer):
    wallet_name = serializers.ReadOnlyField(source='wallet_id.wallet_name')   
    network_name = serializers.ReadOnlyField(source='network_id.network')   
    class Meta:
        model = Balance 
        fields = "__all__"

class WalletSerializer(serializers.ModelSerializer):

    class Meta:
        model = Wallet 
        fields = "__all__"

class NetworkSerializer(serializers.ModelSerializer):

    class Meta:
        model = Network 
        fields = "__all__"
