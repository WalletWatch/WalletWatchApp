from web3 import Web3
from celery import shared_task
from celery.utils.log import get_task_logger
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from .serializers import BalanceSerializer

from .models import Balance
from .request import get_balance, get_token_price

logger = get_task_logger(__name__)

@shared_task(name="realtime_task")
def realtime_task():

    balance = Balance.objects.select_related('wallet_id', 'network_id').all()
    for row in balance.iterator():

        new_balance = get_balance(row.wallet_id.wallet_address, row.asset_address, row.network_id.id)
        new_price = get_token_price(row.asset)

        if (row.balance != new_balance or row.price != new_price):  
            update_balance = row.balance - new_balance
            update_price = row.price - new_price

            row.balance = new_balance
            row.price = new_price
            row.save()

            update_message = {
                'type': 'notification_message',
                'notification': {
                    "asset": row.asset,
                    "wallet": row.wallet_id.wallet_name,
                    "balance": update_balance,
                    'price': update_price,
                    # "updated": row.updated
                }
            }

            serializer = BalanceSerializer(row)
            message = {
                'type': 'loc_message',
                'balance': serializer.data
            }

            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)('core-realtime-data', message)
            async_to_sync(channel_layer.group_send)('alert-realtime-data', update_message)
