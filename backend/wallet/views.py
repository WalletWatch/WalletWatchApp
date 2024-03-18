from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Asset, Wallet
from .serializers import AssetSerializer, WalletSerializer 
from .request import is_wallet_connected, createAsset

@api_view(['GET'])
def balance_list(request):
    if request.method == 'GET':
        balance = Asset.objects.select_related('wallet_id').all()
        serializer = AssetSerializer(balance, context={'request': request} ,many=True)

        return Response({'data': serializer.data }, headers={'Access-Control-Allow-Origin':'*'})

@api_view(['GET', 'POST'])
def wallet_list(request):
    if request.method == 'GET':
        wallets = Wallet.objects.all()
        serializer = WalletSerializer(wallets, context={'request': request} ,many=True)

        return Response({'data': serializer.data })
    elif request.method == 'POST':
        wallet_name = request.data['wallet_name']
        wallet_address = request.data['wallet_address']

        if not is_wallet_connected(wallet_address):
            return Response("Wallet doesn't exist!", status=status.HTTP_400_BAD_REQUEST, headers={'Access-Control-Allow-Origin':'*'})
        
        if Wallet.objects.filter(wallet_address=wallet_address).count() != 0 or Wallet.objects.filter(wallet_name=wallet_name).count() != 0:
            return Response("Such wallet already inputed! Try other name or address.", status=status.HTTP_400_BAD_REQUEST, headers={'Access-Control-Allow-Origin':'*'})
        
        serializer = WalletSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            createAsset(serializer.data['id'], serializer.data['wallet_address'])

            return Response(serializer.data, status=status.HTTP_201_CREATED, headers={'Access-Control-Allow-Origin':'*'})
        else: 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, headers={'Access-Control-Allow-Origin':'*'})

@api_view(['GET', 'DELETE'])
def wallet_detail(request, pk):
    try:
        wallet = Wallet.objects.get(pk=pk)
    except Wallet.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND, headers={'Access-Control-Allow-Origin':'*'})

    if request.method == 'GET':
        serializer = WalletSerializer(wallet, context={'request': request})
        return Response(serializer.data, headers={'Access-Control-Allow-Origin':'*'})

    elif request.method == 'DELETE':
        try:
            Asset.objects.filter(wallet_id=pk).delete()
        except Asset.DoesNotExist:
            print([])
        wallet.delete()
        
        return Response(status=status.HTTP_204_NO_CONTENT, headers={'Access-Control-Allow-Origin':'*'})


@api_view(['GET', 'PUT', 'DELETE'])
def balance_detail(request, pk):
    try:
        balance = Asset.objects.get(pk=pk)
    except Asset.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND, headers={'Access-Control-Allow-Origin':'*'})

    if request.method == 'PUT':
        if request.data['track'] == "true":
            balance.track = True
        else: balance.track= False
        balance.delta = request.data['delta']

        balance.save()
        return Response(status=status.HTTP_204_NO_CONTENT, headers={'Access-Control-Allow-Origin':'*'})

    if request.method == 'GET':
        serializer = AssetSerializer(balance,context={'request': request})
        return Response(serializer.data, headers={'Access-Control-Allow-Origin':'*'})

    elif request.method == 'DELETE':
        balance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT, headers={'Access-Control-Allow-Origin':'*'})
    

