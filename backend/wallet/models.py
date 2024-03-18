from django.db import models
from django.db.models import Sum

class Wallet(models.Model):
	wallet_name = models.CharField(max_length=255, unique=True)
	wallet_address = models.CharField(max_length=255, unique=True, blank=True)
	wallet_sum = models.FloatField(default=0)
	
	def __str__(self):
		return self.wallet_name
	
	def update(self, *args, **kwargs):
		sum = Asset.objects.filter(wallet_id=self.id).aggregate(Sum('value'))
		self.wallet_sum = sum['value__sum']  if sum['value__sum'] else 0
		super().save(*args, **kwargs)
		

class Network(models.Model):
	network = models.CharField(max_length=20)
	network_url = models.CharField(max_length=256)
	network_abi = models.TextField()
	network_chain = models.CharField(default="")

	def __str__(self):
		return self.network

class Asset(models.Model):
	asset = models.CharField(default="")
	asset_address = models.CharField(max_length=255, blank=True)
	balance = models.FloatField(default=0)
	price = models.FloatField(default=0)
	value = models.FloatField(default=0)
	track = models.BooleanField(default=False)
	delta = models.FloatField(default=0.01)
	createdAt = models.DateTimeField("Created At", auto_now_add=True)
	updated = models.DateTimeField("Updated At", auto_now=True)
	network_id = models.ForeignKey('Network', on_delete=models.PROTECT, null=True)
	wallet_id = models.ForeignKey('Wallet', on_delete=models.PROTECT, null=True)

	def __str__(self):
		return self.asset
