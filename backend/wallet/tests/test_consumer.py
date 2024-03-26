# from channels.testing import WebsocketCommunicator
# from channels.layers import get_channel_layer
# from django.test import TestCase
# from ..routing import websocket_urlpatterns
# import json

# class WalletConsumerTestCase(TestCase):
#     def setUp(self):
#         self.channel_layer = get_channel_layer()

#     async def test_wallet_consumer(self):
#         communicator = WebsocketCommunicator(websocket_urlpatterns, "/ws/wallet/")
#         connected, subprotocol = await communicator.connect()

#         self.assertTrue(connected)
#         await communicator.disconnect()
#         # await self.channel_layer.group_send(
#         #     'core-realtime-data',
#         #     {
#         #         'type': 'loc_message',
#         #         'balance': {'balance': 100}  # Sample data for balance
#         #     }
#         # )

#         # response = await communicator.receive_json_from()
#         # self.assertEqual(response, {'balance': {'balance': 100}})

#         # await communicator.disconnect()

#     # async def test_wallet_consumer_with_mock_send(self):
#     #     communicator = WebsocketCommunicator(WalletConsumer, "/ws/core-realtime-data/")
#     #     communicator.scope['send'] = MockSend()
#     #     connected, subprotocol = await communicator.connect()

#     #     self.assertTrue(connected)

#     #     await self.channel_layer.group_send(
#     #         'core-realtime-data',
#     #         {
#     #             'type': 'loc_message',
#     #             'balance': {'balance': 100}  # Sample data for balance
#     #         }
#     #     )

#     #     response = await communicator.receive_json_from()
#     #     self.assertEqual(response, {'balance': {'balance': 100}})

#     #     await communicator.disconnect()
