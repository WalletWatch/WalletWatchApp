from web3 import Web3
from celery import shared_task
from celery.utils.log import get_task_logger
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from datetime import datetime
from django.db.models import Sum

from .serializers import AssetSerializer, WalletSerializer
from .models import Asset, Wallet
from .request import get_balance, get_token_price

logger = get_task_logger(__name__)


@shared_task(name="update_balance")
def update_balance():
    channel_layer = get_channel_layer()

    balance = Asset.objects.select_related('wallet_id', 'network_id').all()
    for row in balance.iterator():
        new_balance = get_balance(row.wallet_id.wallet_address, row.asset_address, row.network_id.id)
        new_price = get_token_price(row.asset)

        print(f"{row.asset_address} - {row.asset}: {new_balance} - {new_price}")

        if (new_balance and new_price and (row.balance != new_balance or row.price != new_price)):
            d_balance = new_balance - row.balance

            if (row.track and abs(d_balance) > row.delta):
                message = {
                    'type': 'alert_message',
                    'data' : {'balance': {
                        "asset": row.asset,
                        "wallet": row.wallet_id.wallet_name,
                        "network": row.network_id.network,
                        "balance": d_balance,
                        "updated": str(datetime.now())
                    }}
                }

                async_to_sync(channel_layer.group_send)('alert-realtime-data', message)

            row.balance = new_balance if new_balance else row.balance
            row.price = new_price if new_price else row.price
            row.value = row.balance * row.price

            row.save()
        
            serializer = AssetSerializer(row)
            message = {
                'type': 'loc_message',
                'data' : {'balance': serializer.data, 'update': True}
            }

            async_to_sync(channel_layer.group_send)('core-realtime-data', message)

@shared_task(name="update_wallet")
def update_wallet():
    wallets = Wallet.objects.all()
    channel_layer = get_channel_layer()

    for wallet in wallets.iterator():
        # wallet.update()
        sum = Asset.objects.filter(wallet_id=wallet.id).aggregate(Sum('value'))

        d_sum = sum["value__sum"] - wallet.wallet_sum
        print(f"${wallet.wallet_name}  - ${d_sum}")
        if abs(d_sum) > 10**(-5):
            message = {
                'type': 'alert_message',
                'data' : {'wallet': {
                    "wallet": wallet.wallet_name,
                    "balance": d_sum,
                    "updated": str(datetime.now())
                }}
            }

            async_to_sync(channel_layer.group_send)('alert-realtime-data', message)

        wallet.wallet_sum = sum["value__sum"]
        wallet.save() 

        serializer = WalletSerializer(wallet)
        message = {
            'type': 'loc_message',
            'data' : {'wallet': serializer.data}
        }

        async_to_sync(channel_layer.group_send)('core-realtime-data', message)
