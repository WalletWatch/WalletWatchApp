from web3 import Web3
from moralis import evm_api
from requests import Session
import json
import os

# from .serializers import AssetSerializer
# from .models import Wallet, Network

# MORALIS_API = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImI3ZDE0MDJmLTI5NTMtNDk3Zi1hMWIyLTNjMzk5OGNkOTRmNCIsIm9yZ0lkIjoiMzg2MTcxIiwidXNlcklkIjoiMzk2ODAyIiwidHlwZUlkIjoiNzE2N2MwY2MtMGNkNS00ODk3LWE0MTAtZjY1NGM0NjFhNDAzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTIxNjc5MTcsImV4cCI6NDg2NzkyNzkxN30.f6BAqK1I-8yn1RyoqNNKx9y_jovbghohsQ3Q2uRFQhg"
# COINMARKET_URL = 'https://pro-api.coinmarketcap.com/v2/tools/price-conversion'
# COINMARKET_APIKEY = "3f7955f4-e74d-4064-b6cb-55cfacf51718"

# def token_list_with_price(chain, address):
#     params = {
#         "chain": chain,
#         "address": address
#     }

#     result = evm_api.wallets.get_wallet_token_balances_price(
#         api_key=MORALIS_API,
#         params=params,
#     )

#     return result["result"]

# def is_wallet_connected(wallet_address):
#     return Web3.is_address(wallet_address)

# def createAsset(id, wallet_address):
#     networks = Network.objects.all()
#     for chain in networks:
#         token_list = token_list_with_price(chain.network_chain, wallet_address)
        
#         for token in token_list:
#             if token['usd_price'] is None or not token['verified_contract']:
#                 continue

#             if token['decimals'] != 0 and token['decimals']:
#                 balance = float(token['balance']) / 10 ** float(token['decimals'])
#             else:
#                 balance = float(token['balance'])

#             serializer = AssetSerializer(data={
#                 "asset": token['symbol'],
#                 "asset_address": token['token_address'], 
#                 "network_id": chain.id,
#                 "balance": balance,
#                 "price": float(token['usd_price']) if token['usd_price'] else 0,
#                 "value": float(token['usd_value']) if token['usd_value'] else 0,
#                 "wallet_id": id, 
#             })

#             if serializer.is_valid():
#                 serializer.save()
    
#     Wallet.objects.get(id=id).update()

# def update_tokens(chain, address, token_address):
#     params = {
#         "chain": chain,
#         "token_addresses": token_address,
#         "address": address
#     }

#     result = evm_api.wallets.get_wallet_token_balances_price(
#         api_key=MORALIS_API,
#         params=params,
#     )

#     return result['result'][0]

# def get_balance(wallet_adress, token_adress, network_id):
#     network = Network.objects.get(id=network_id)

#     web3 = Web3(Web3.HTTPProvider(network.network_url))
#     if web3.is_connected():
#         try:
#             contract = web3.eth.contract(token_adress, abi=network.network_ABI)
#             balance_of_token = contract.functions.balanceOf(wallet_adress).call()  # in Wei
#             token_decimals = contract.functions.decimals().call()

#             balance = balance_of_token / 10 ** token_decimals
            
#             return balance
#         except:
#             return None

#     return None

# def get_token_price(symbol):
#     parameters = {
#         'amount': 1,
#         'symbol': symbol,
#         'convert':'USDT'
#     }
#     headers = {
#         'Accepts': 'application/json',
#         'X-CMC_PRO_API_KEY': COINMARKET_APIKEY,
#     }

#     session = Session()
#     session.headers.update(headers)

#     try:
#         response = session.get(COINMARKET_URL, params=parameters)
#         data = json.loads(response.text)
#         return data['data'][0]['quote']['USDT']['price']
#     except:
#         return None

#     return None

network_url='https://mainnet.infura.io/v3/3c7ba8ecf29b439ab0cb11ddc4b70989'
network_abi='''[{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_initialSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"decimals_","type":"uint8"}],"name":"setupDecimals","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]'''
    

def get_balance(wallet_adress, token_adress):
    web3 = Web3(Web3.HTTPProvider('https://mainnet.infura.io/v3/3c7ba8ecf29b439ab0cb11ddc4b70989'))
    print(web3.is_connected())
    if web3.is_connected():
        try:
            contract = web3.eth.contract(token_adress, abi=network_abi)
            balance_of_token = contract.functions.balanceOf(wallet_adress).call()  # in Wei
            token_decimals = contract.functions.decimals().call()

            balance = balance_of_token / 10 ** token_decimals
            
            return balance
        except Exception as error:
            print(error)
            return None

    return None

result = get_balance("0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5", "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE")
print(result)
