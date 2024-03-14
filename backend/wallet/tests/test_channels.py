# from channels.testing import WebsocketCommunicator
# from channels.layers import get_channel_layer
# from asgiref.sync import async_to_sync
# from django.test import TestCase
# from unittest.mock import patch

# from ..tasks import realtime_task
# from ..consumers import WalletConsumer
# from ..models import Balance, Network, Wallet

# class ConsumerTestCase(TestCase):
#     async def test_wallet_consumer(self):
#         communicator = WebsocketCommunicator(WalletConsumer.as_asgi(), "/ws/wallet/")
#         connected, _ = await communicator.connect()
#         assert connected

#         # channel_layer = get_channel_layer()
#         # async_to_sync(channel_layer.group_send)('core-realtime-data', {
#         #     "type": "loc_message",
#         #     "balance": {"balance": 100}  # Example balance data
#         # })
        
#         # response = await communicator.receive_json_from()
#         # assert response == {"balance": {"balance": 100}}

#         # await channel_layer.group_discard("core-realtime-data", communicator.channel_name)
#         # await communicator.disconnect()


#     def mock_get_balance(wallet_adress, token_adress, network_id):
#         return 100

#     def mock_get_token_price(symbol):
#         return 10

#     # @patch('wallet.request.get_balance', return_value=100)  # mock get_balance function
#     # @patch('wallet.request.get_token_price', return_value=10)  # mock get_token_price function
#     # async def test_realtime_task(self, get_balance, get_token_price):
#     #     communicator = WebsocketCommunicator(WalletConsumer, "/ws/wallet/")
#     #     connected, _ = await communicator.connect()
#     #     assert connected

#     #     network = Network.objects.create(network="ERC20", network_url="url", network_ABI='''abi''')
#     #     wallet = Wallet.objects.create(wallet_name="test", wallet_address="address")
#     #     balance = Balance.objects.create(wallet_id=wallet, asset="ETH", asset_address='ETH_address', network_id=network, balance=50, price=5)
#     #     realtime_task()

#     #     response = await communicator.receive_json_from()
#     #     print(response)

#     #     await communicator.disconnect()
