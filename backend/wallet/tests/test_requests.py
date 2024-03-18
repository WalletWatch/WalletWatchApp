from django.test import TestCase
from unittest.mock import patch, MagicMock

from ..models import Network, Wallet, Asset
from ..serializers import AssetSerializer
from ..request import is_wallet_connected, get_balance, get_token_price, createAsset

INFURA_URL = 'https://mainnet.infura.io/v3/3c7ba8ecf29b439ab0cb11ddc4b70989'
ERC20_ABI = '''[{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_initialSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"decimals_","type":"uint8"}],"name":"setupDecimals","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]'''

COINMARKET_URL = 'https://pro-api.coinmarketcap.com/v2/tools/price-conversion'
COINMARKET_APIKEY = "3f7955f4-e74d-4064-b6cb-55cfacf51718"

class RequestsTestCase(TestCase):
    # def test_is_wallet_connected(self):
    #     self.assertFalse(is_wallet_connected("some wallet")) 
    #     self.assertTrue(is_wallet_connected("0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97")) 

    # def test_get_balance(self):
    #     balance = get_balance("0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97", "0xdAC17F958D2ee523a2206206994597C13D831ec7", "1")
    #     self.assertIs(type(balance), float)

    #     balance = get_balance("some wallet", "0xdAC17F958D2ee523a2206206994597C13D831ec7", "1")
    #     self.assertIsNone(balance)

    #     balance = get_balance("0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97", "some incorect address", "1")
    #     self.assertIsNone(balance)

    
    # def test_get_token_price(self):
    #     price = get_token_price("ETH")
    #     self.assertIs(type(price), float)

    #     price = get_token_price("Invalid")
    #     self.assertIsNone(price)

    @patch('wallet.request.token_list_with_price')
    @patch('wallet.request.get_channel_layer')
    @patch('wallet.request.async_to_sync')
    def test_create_asset(self, mock_async_to_sync,  mock_get_channel_layer, mock_token_list_with_price):
        wallet = Wallet.objects.create(wallet_name="test", wallet_address="0x207c7F9f6ced8bebF97CA833A28135db1D4e3FE2")

        mock_serializer = MagicMock(spec=AssetSerializer)
        mock_serializer.is_valid.return_value = True
        mock_serializer.save.return_value = {'asset': 'test_asset', 'balance': 2}

        mock_token_list = [
            {'symbol': 'test_symbol', 'token_address': 'test_address', 'decimals': 2,
             'balance': 200, 'usd_price': 1.0, 'usd_value': 100.0, 'verified_contract': True}
        ]

        mock_channel_layer = MagicMock()
        mock_channel_layer.group_send.return_value = None

        # Assigning mocks to respective function calls
        mock_token_list_with_price.return_value = mock_token_list
        mock_get_channel_layer.return_value = mock_channel_layer

        with patch("wallet.request.async_to_sync") as mock_async_to_sync:
            createAsset(wallet.id, wallet.wallet_address)

        # Assertions
        self.assertEqual(mock_token_list_with_price.call_count, 2)
        mock_token_list_with_price.assert_called_with("bsc", "0x207c7F9f6ced8bebF97CA833A28135db1D4e3FE2")
        
        assets = Asset.objects.all()
        self.assertEqual(len(assets), 2)

        first = Asset.objects.get(pk=2)
        self.assertEqual(first.balance, 2.0)
