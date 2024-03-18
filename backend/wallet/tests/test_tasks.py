from django.test import TestCase
from unittest.mock import patch, MagicMock

from ..models import Network, Wallet, Asset
from ..serializers import AssetSerializer
from ..tasks import update_balance, update_wallet

class TasksTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        Wallet.objects.create(wallet_name="test", wallet_address="0x207c7F9f6ced8bebF97CA833A28135db1D4e3FE2")
        Asset.objects.create(
            asset='test',
            asset_address='test_adress', 
            network_id=Network.objects.get(id=1),
            balance=4,
            price=6,
            value=24,
            wallet_id=Wallet.objects.get(id=3),
        )
    
    @patch('wallet.tasks.get_channel_layer')
    @patch('wallet.tasks.async_to_sync')
    @patch('wallet.tasks.get_balance')
    @patch('wallet.tasks.get_token_price')
    def test_update_balance(self, mock_get_token_price, mock_get_balance,  mock_async_to_sync,  mock_get_channel_layer):
        mock_channel_layer = MagicMock()
        mock_channel_layer.group_send.return_value = None
        mock_get_channel_layer.return_value = mock_channel_layer
        mock_get_balance.return_value = 10
        mock_get_token_price.return_value = 2

        update_balance()
        asset = Asset.objects.get(pk=4)
        self.assertEqual(asset.balance, 10.0)
        self.assertEqual(asset.price, 2.0)
        self.assertEqual(asset.value, 20.0)

    @patch('wallet.tasks.get_channel_layer')
    @patch('wallet.tasks.async_to_sync')
    @patch('wallet.tasks.get_balance')
    @patch('wallet.tasks.get_token_price')
    def test_uncorrect_update_balance(self, mock_get_token_price, mock_get_balance,  mock_async_to_sync,  mock_get_channel_layer):
        mock_channel_layer = MagicMock()
        mock_channel_layer.group_send.return_value = None
        mock_get_channel_layer.return_value = mock_channel_layer
        mock_get_balance.return_value = None
        mock_get_token_price.return_value = None

        update_balance()
        asset = Asset.objects.get(pk=4)
        self.assertEqual(asset.balance, 4.0)
        self.assertEqual(asset.price, 6.0)
        self.assertEqual(asset.value, 24.0)

    @patch('wallet.tasks.get_channel_layer')
    @patch('wallet.tasks.async_to_sync')
    @patch('wallet.tasks.get_balance')
    @patch('wallet.tasks.get_token_price')
    def test_update_wallet(self, mock_get_token_price, mock_get_balance,  mock_async_to_sync,  mock_get_channel_layer):
        mock_channel_layer = MagicMock()
        mock_channel_layer.group_send.return_value = None
        mock_get_channel_layer.return_value = mock_channel_layer
        mock_get_balance.return_value = 10
        mock_get_token_price.return_value = 2

        wallet = Wallet.objects.get(pk=3)
        self.assertEqual(wallet.wallet_sum, 0.0)
        update_balance()
        update_wallet()
        wallet = Wallet.objects.get(pk=3)
        self.assertEqual(wallet.wallet_sum, 20.0)
