from web3 import Web3
import json
from requests import Session

INFURA_URL = 'https://mainnet.infura.io/v3/3c7ba8ecf29b439ab0cb11ddc4b70989'
# ERC20_ABI = json.loads('''[{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_initialSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"decimals_","type":"uint8"}],"name":"setupDecimals","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]''')
COINMARKET_URL = 'https://pro-api.coinmarketcap.com/v2/tools/price-conversion'
COINMARKET_APIKEY = "3f7955f4-e74d-4064-b6cb-55cfacf51718"

web3 = Web3(Web3.HTTPProvider(INFURA_URL))
balance = web3.eth.get_balance("0x55FE002aefF02F77364de339a1292923A15844B8")

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

print(get_token_price("ETH"))
print(balance/10**18)


from web3 import Web3
from web3.middleware import construct_sign_and_send_raw_middleware
from hexbytes import HexBytes

# Установка параметров подключения к сети Ethereum через Infura
infura_url = "https://mainnet.infura.io/v3/your_infura_project_id"
web3 = Web3(Web3.HTTPProvider(infura_url))

# Адрес кошелька, баланс которого мы хотим проверить
wallet_address = "0xYourWalletAddress"

# Получение списка всех токенов, находящихся на балансе данного адреса
def get_token_balances(wallet_address):
    token_balances = {}
    
    # Загрузка ABI для ERC20 токенов
    with open('ERC20_ABI.json', 'r') as abi_definition:
        abi = json.load(abi_definition)
    
    # Получение списка всех токенов, находящихся на балансе данного адреса
    for contract_address in tokens:
        contract = web3.eth.contract(address=contract_address, abi=abi)
        balance = contract.functions.balanceOf(wallet_address).call()
        token_symbol = contract.functions.symbol().call()
        token_balances[token_symbol] = balance
        
    return token_balances

# Получение общего баланса всех токенов
def get_total_token_balance(wallet_address):
    token_balances = get_token_balances(wallet_address)
    total_balance = sum(token_balances.values())
    return total_balance

# Получение общего баланса всех токенов по адресу кошелька
total_balance = get_total_token_balance(wallet_address)
print("Total balance of all tokens:", total_balance)
