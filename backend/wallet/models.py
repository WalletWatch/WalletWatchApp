from django.db import models

class Wallet(models.Model):
	wallet_name = models.CharField(max_length=255, unique=True)
	wallet_address = models.CharField(max_length=255, unique=True, blank=True)
	
	def __str__(self):
		return self.wallet_name

class Network(models.Model):
	network = models.CharField(max_length=20)
	network_url = models.CharField(max_length=256)
	network_ABI = models.TextField()

	def __str__(self):
		return self.network

class Balance(models.Model):
	asset = models.CharField(max_length=20)
	asset_address = models.CharField(max_length=255, blank=True)
	balance = models.FloatField(default=0)
	price = models.FloatField(default=0)
	createdAt = models.DateTimeField("Created At", auto_now_add=True)
	updated = models.DateTimeField("Updated At", auto_now=True)
	network_id = models.ForeignKey('Network', on_delete=models.PROTECT, null=True)
	wallet_id = models.ForeignKey('Wallet', on_delete=models.PROTECT, null=True)

	def __str__(self):
		return self.asset
