from django.urls import path
from channels.routing import URLRouter
from . import consumers

websocket_urlpatterns = URLRouter([
    path('ws/wallet/', consumers.WalletConsumer.as_asgi()),
])
