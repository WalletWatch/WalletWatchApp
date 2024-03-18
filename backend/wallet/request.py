from web3 import Web3
from moralis import evm_api
from requests import Session
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
import json
import os

from .serializers import AssetSerializer
from .models import Wallet, Network

MORALIS_API = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImI3ZDE0MDJmLTI5NTMtNDk3Zi1hMWIyLTNjMzk5OGNkOTRmNCIsIm9yZ0lkIjoiMzg2MTcxIiwidXNlcklkIjoiMzk2ODAyIiwidHlwZUlkIjoiNzE2N2MwY2MtMGNkNS00ODk3LWE0MTAtZjY1NGM0NjFhNDAzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTIxNjc5MTcsImV4cCI6NDg2NzkyNzkxN30.f6BAqK1I-8yn1RyoqNNKx9y_jovbghohsQ3Q2uRFQhg"
COINMARKET_URL = 'https://pro-api.coinmarketcap.com/v2/tools/price-conversion'
COINMARKET_APIKEY = "6c3bed18-6c25-4e4a-9a3e-c8243cf734b5"

def token_list_with_price(chain, address):
    params = {
        "chain": chain,
        "address": address
    }

    result = evm_api.wallets.get_wallet_token_balances_price(
        api_key=MORALIS_API,
        params=params,
    )

    return result["result"]

def is_wallet_connected(wallet_address):
    return Web3.is_address(wallet_address)

def createAsset(id, wallet_address):
    networks = Network.objects.all()
    channel_layer = get_channel_layer()
    for chain in networks:
        token_list = token_list_with_price(chain.network_chain, wallet_address)
        for token in token_list:
            if token['usd_price'] is None or not token['verified_contract']:
                continue

            if token['decimals'] != 0 and token['decimals']:
                balance = float(token['balance']) / 10 ** float(token['decimals'])
            else:
                balance = float(token['balance'])

            serializer = AssetSerializer(data={
                "asset": token['symbol'],
                "asset_address": token['token_address'], 
                "network_id": chain.id,
                "balance": balance,
                "price": float(token['usd_price']) if token['usd_price'] else 0,
                "value": float(token['usd_value']) if token['usd_value'] else 0,
                "wallet_id": id, 
            })
            
            if serializer.is_valid():
                serializer.save()

                message = {
                    'type': 'loc_message',
                    'data' : {'balance': serializer.data}
                }
                async_to_sync(channel_layer.group_send)('core-realtime-data', message)
    
    wallet = Wallet.objects.get(id=id)
    wallet.update()
    message = {
        'type': 'loc_message',
        'data' : {'wallet': serializer.data}
    }
    async_to_sync(channel_layer.group_send)('core-realtime-data', message)

def get_balance(wallet_adress, token_adress, network_id):
    network = Network.objects.get(id=network_id)

    web3 = Web3(Web3.HTTPProvider(network.network_url))
    if web3.is_connected():
        try:
            contract = web3.eth.contract(Web3.to_checksum_address(token_adress), abi=network.network_abi)
            balance_of_token = contract.functions.balanceOf(wallet_adress).call() 
            token_decimals = contract.functions.decimals().call()

            balance = balance_of_token / 10 ** token_decimals
            
            return balance
        except Exception as error:
            if token_adress == "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE":
                balance = web3.eth.get_balance(wallet_adress) / 10**18
                return balance
            
            print(f'{token_adress} - ${error}')
            return None

    return None

def get_token_price(symbol):
    parameters = {
        'amount': 1,
        'symbol': symbol,
        'convert':'USDT'
    }
    headers = {
        'Accepts': 'application/json',
        'X-CMC_PRO_API_KEY': COINMARKET_APIKEY,
    }

    session = Session()
    session.headers.update(headers)

    try:
        response = session.get(COINMARKET_URL, params=parameters)
        data = json.loads(response.text)
        return data['data'][0]['quote']['USDT']['price']
    except:
        return None