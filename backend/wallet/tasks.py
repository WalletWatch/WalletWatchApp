from web3 import Web3
from celery import shared_task
from celery.utils.log import get_task_logger
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from .serializers import BalanceSerializer

from .models import Balance
from .request import get_balance, get_token_price

logger = get_task_logger(__name__)
INFURA_URL = 'https://mainnet.infura.io/v3/3c7ba8ecf29b439ab0cb11ddc4b70989'

@shared_task(name="realtime_task")
def realtime_task():
    logger.info(Web3(Web3.HTTPProvider(INFURA_URL)))

    balance = Balance.objects.select_related('wallet_id', 'network_id').all()
    for row in balance.iterator():
        logger.info(row)
        
        new_balance = get_balance(row.wallet_id.wallet_address, row.asset_address, row.network_id.id)
        new_price = get_token_price(row.asset)
        logger.info(f"Новый баланс: {new_balance}, Новая цена: {new_price}")

        if (row.balance != new_balance or row.price != new_price):
            row.balance = new_balance
            row.price = new_price

            row.save()
        
            serializer = BalanceSerializer(row)
            message = {
                'type': 'loc_message',
                'balance': serializer.data
            }

            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)('core-realtime-data', message)
