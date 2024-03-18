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
        message = event['data'] 
        await self.send(text_data=json.dumps(message))

class AlertConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("Connected to alert")
        self.channel_group_name = 'alert-realtime-data'

        await self.channel_layer.group_add(
            self.channel_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        print("Disconnected from alert")
        await self.channel_layer.group_discard(
            self.channel_group_name,
            self.channel_name
        )
    
    async def receive(self, text_data):
        print(text_data)
        pass

    async def alert_message(self, event):
        message = event['data']

        await self.send(text_data=json.dumps(message))
