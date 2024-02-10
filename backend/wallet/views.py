from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Balance, Wallet, Network
from .serializers import BalanceSerializer, WalletSerializer, NetworkSerializer
from .request import get_balance, get_token_symbol, is_wallet_connected, get_token_price, is_contract_exist

@api_view(['GET', 'POST'])
def balance_list(request):
    if request.method == 'GET':
        balance = Balance.objects.select_related('wallet_id', 'network_id').all()
        serializer = BalanceSerializer(balance, context={'request': request} ,many=True)

        return Response({'data': serializer.data }, headers={'Access-Control-Allow-Origin':'*'})
    elif request.method == 'POST':
        asset_address = request.data['asset_address']
        wallet_id = request.data['wallet_id']
        network_id = request.data['network_id']

        if (not is_contract_exist(asset_address, network_id)):
            return Response("Sush asset address doesn't exist", status=status.HTTP_404_NOT_FOUND, headers={'Access-Control-Allow-Origin':'*'})

        if Balance.objects.filter(asset_address=asset_address, wallet_id=wallet_id).count() != 0:
            return Response("Sush asset address exist", status=status.HTTP_400_BAD_REQUEST, headers={'Access-Control-Allow-Origin':'*'})
        
        try:
            wallet = Wallet.objects.get(pk=wallet_id)
        except Wallet.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND, headers={'Access-Control-Allow-Origin':'*'})

        try:
            network = Network.objects.get(pk=network_id)
        except Wallet.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND, headers={'Access-Control-Allow-Origin':'*'})

        asset_name = get_token_symbol(asset_address, network_id)
        balance = get_balance(wallet.wallet_address, asset_address, network_id)
        price = get_token_price(asset_name)

        print(asset_name, balance, price)

        serializer = BalanceSerializer(data={
            "asset": asset_name,
            "asset_address": asset_address, 
            "network_id": network_id,
            "balance": balance,
            "price": price,
            "wallet_id": wallet_id, 
        })

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers={'Access-Control-Allow-Origin':'*'})

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, headers={'Access-Control-Allow-Origin':'*'})

@api_view(['GET', 'POST'])
def wallet_list(request):
    if request.method == 'GET':
        wallets = Wallet.objects.all()
        serializer = WalletSerializer(wallets, context={'request': request} ,many=True)

        return Response({'data': serializer.data })
    elif request.method == 'POST':
        serializer = WalletSerializer(data=request.data)

        if serializer.is_valid():
            if is_wallet_connected(request.data['wallet_address']):
                serializer.save()
            else: 
                return Response("Wallet doesn't exist", status=status.HTTP_400_BAD_REQUEST, headers={'Access-Control-Allow-Origin':'*'})
            
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers={'Access-Control-Allow-Origin':'*'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, headers={'Access-Control-Allow-Origin':'*'})

@api_view(['GET', 'PUT', 'DELETE'])
def wallet_detail(request, pk):
    try:
        wallet = Wallet.objects.get(pk=pk)
    except Wallet.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND, headers={'Access-Control-Allow-Origin':'*'})

    if request.method == 'GET':
        serializer = WalletSerializer(wallet, context={'request': request})
        return Response(serializer.data, headers={'Access-Control-Allow-Origin':'*'})

    elif request.method == 'PUT':
        serializer = WalletSerializer(wallet, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, headers={'Access-Control-Allow-Origin':'*'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, headers={'Access-Control-Allow-Origin':'*'})

    elif request.method == 'DELETE':
        try:
            Balance.objects.get(wallet_id=pk).delete()
        except Balance.DoesNotExist:
            print([])
        wallet.delete()
        
        return Response(status=status.HTTP_204_NO_CONTENT, headers={'Access-Control-Allow-Origin':'*'})


@api_view(['GET', 'PUT', 'DELETE'])
def balance_detail(request, pk):
    try:
        balance = Balance.objects.get(pk=pk)
    except Balance.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND, headers={'Access-Control-Allow-Origin':'*'})

    if request.method == 'GET':
        serializer = BalanceSerializer(balance,context={'request': request})
        return Response(serializer.data, headers={'Access-Control-Allow-Origin':'*'})

    elif request.method == 'PUT':
        serializer = BalanceSerializer(balance, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, headers={'Access-Control-Allow-Origin':'*'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, headers={'Access-Control-Allow-Origin':'*'})

    elif request.method == 'DELETE':
        balance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT, headers={'Access-Control-Allow-Origin':'*'})


@api_view(['GET', 'POST'])
def network_list(request):
    if request.method == 'GET':
        networks = Network.objects.all()
        serializer = NetworkSerializer(networks, context={'request': request} ,many=True)

        return Response({'data': serializer.data }, headers={'Access-Control-Allow-Origin':'*'})
    elif request.method == 'POST':
        network = request.data['network']
        network_url = request.data['network_url']
        network_abi = request.data['network_abi']

        serializer = NetworkSerializer(data={
            "network": network,
            "network_url": network_url, 
            "network_ABI": network_abi,
        })

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers={'Access-Control-Allow-Origin':'*'})

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, headers={'Access-Control-Allow-Origin':'*'})

@api_view(['GET', 'PUT', 'DELETE'])
def network_detail(request, pk):
    try:
        network = Network.objects.get(pk=pk)
    except Network.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND, headers={'Access-Control-Allow-Origin':'*'})

    if request.method == 'GET':
        serializer = NetworkSerializer(network,context={'request': request})
        return Response(serializer.data, headers={'Access-Control-Allow-Origin':'*'})

    elif request.method == 'PUT':
        serializer = NetworkSerializer(network, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, headers={'Access-Control-Allow-Origin':'*'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, headers={'Access-Control-Allow-Origin':'*'})

    elif request.method == 'DELETE':
        network.delete()

        return Response(status=status.HTTP_204_NO_CONTENT, headers={'Access-Control-Allow-Origin':'*'})

