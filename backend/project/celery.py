# project/celery.py

import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")
app = Celery("project")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

app.conf.beat_schedule = {
    "update_balance_schedule": {
        "task": "update_balance",
        "schedule": crontab(minute='*/20'),
    },
    "update_wallet_schedule": {
        "task": "update_wallet",
        "schedule": crontab(minute='*/2'),
    }
}
