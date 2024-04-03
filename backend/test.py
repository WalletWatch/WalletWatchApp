# from web3 import Web3
# import json
# from requests import Session
# import requests

# INFURA_URL = 'https://mainnet.infura.io/v3/3c7ba8ecf29b439ab0cb11ddc4b70989'
# # ERC20_ABI = json.loads('''[{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_initialSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"decimals_","type":"uint8"}],"name":"setupDecimals","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]''')
# COINMARKET_URL = 'https://pro-api.coinmarketcap.com/v2/tools/price-conversion'
# COINMARKET_APIKEY = "3f7955f4-e74d-4064-b6cb-55cfacf51718"

# from web3 import Web3
# from web3.middleware import construct_sign_and_send_raw_middleware
# from hexbytes import HexBytes

# # Установка параметров подключения к сети Ethereum через Infura
# infura_url = "https://mainnet.infura.io/v3/your_infura_project_id"
# web3 = Web3(Web3.HTTPProvider(infura_url))

# # Адрес кошелька, баланс которого мы хотим проверить
# wallet_address = "0xYourWalletAddress"

# def get_token_list(wallet_address, api_key):
#     url = f"https://api.etherscan.io/api?module=account&action=tokenlist&address=0xC6CdB691a9C81B475c990edbEC133B49d9C79C0c&apikey=1UK7GE4EFZ56552IRZ93YH9KD52KDQY7PT"
#     response = requests.get(url)
#     data = response.json()
#     if data['status'] == "1":
#         return data['result']
#     else:
#         return None

# # Пример использования
# wallet_address = "0xYourWalletAddress"
# api_key = "YourEtherscanAPIKey"

# token_list = get_token_list(wallet_address, api_key)
# if token_list:
#     print("Token contracts in wallet:")
#     for token in token_list:
#         print(token['contractAddress'], "-", token['tokenName'])
# else:
#     print("Failed to retrieve token list")



# # Получение списка всех токенов, находящихся на балансе данного адреса
# def get_token_balances(wallet_address):
#     token_balances = {}
    
#     # Загрузка ABI для ERC20 токенов
#     with open('ERC20_ABI.json', 'r') as abi_definition:
#         abi = json.load(abi_definition)
    
#     # Получение списка всех токенов, находящихся на балансе данного адреса
#     for contract_address in tokens:
#         contract = web3.eth.contract(address=contract_address, abi=abi)
#         balance = contract.functions.balanceOf(wallet_address).call()
#         token_symbol = contract.functions.symbol().call()
#         token_balances[token_symbol] = balance
        
#     return token_balances

# # Получение общего баланса всех токенов
# def get_total_token_balance(wallet_address):
#     token_balances = get_token_balances(wallet_address)
#     total_balance = sum(token_balances.values())
#     return total_balance

# # Получение общего баланса всех токенов по адресу кошелька
# total_balance = get_total_token_balance(wallet_address)
# print("Total balance of all tokens:", total_balance)


# # https://docs.etherscan.io/api-endpoints/tokens#get-address-erc20-token-holding

# # https://api.etherscan.io/api?module=account&action=addresstokenbalance&address=0x983e3660c0bE01991785F80f266A84B911ab59b0&page=1&offset=100&apikey=YourApiKeyToken


from web3 import Web3
import json

INFURA_URL = 'https://mainnet.infura.io/v3/3c7ba8ecf29b439ab0cb11ddc4b70989'
ERC20_ABI = json.loads('''[{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_initialSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"decimals_","type":"uint8"}],"name":"setupDecimals","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]''')

web3 = Web3(Web3.HTTPProvider(INFURA_URL))


def getTokenList(walletAddress):
    transactions = web3.eth.get_transaction_receipt(walletAddress)
    contractAddresses = list(map(lambda x: x.contractAddress, transactions))

    tokenList = []

    for address in contractAddresses: 
        contract = web3.eth.contract(address=address, abi=ERC20_ABI)
        name = contract.functions.name().call()
        symbol = contract.functions.symbol().call()
        decimals = contract.functions.decimals().call()

        if (name and symbol and decimals):
            tokenList.append({
                "address": address,
                "name": name,
                "symbol": symbol,
                "decimals": decimals
            })

    return tokenList


getTokenList("0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97")