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
        logger.info(row)

        new_balance = get_balance(row.wallet_id.wallet_address, row.asset_address, row.network_id.id)
        new_price = get_token_price(row.asset)

        if (row.balance != new_balance or row.price != new_price):
            row.balance = new_balance
            row.price = new_price

            row.save()

            logger.info(row)
        
            serializer = BalanceSerializer(row)
            message = {
                'type': 'loc_message',
                'balance': serializer.data
            }

            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)('core-realtime-data', message)
