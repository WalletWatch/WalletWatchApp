import json
from channels.generic.websocket import AsyncWebsocketConsumer

class WalletConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("Connected")
        self.channel_group_name = 'core-realtime-data'

        await self.channel_layer.group_add(
            self.channel_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        print("Disconnected")
        await self.channel_layer.group_discard(
            self.channel_group_name,
            self.channel_name
        )
    
    async def receive(self, text_data):
        print(text_data)
        pass

    async def loc_message(self, event):
        message = event['balance']

        await self.send(text_data=json.dumps({
            'balance': message,
        }))
