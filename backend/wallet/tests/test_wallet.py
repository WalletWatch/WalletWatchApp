from django.test import TestCase
from ..models import Wallet
from ..request import is_wallet_connected

class WalletTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.wallet = Wallet.objects.create(wallet_name="test", wallet_address="0x207c7F9f6ced8bebF97CA833A28135db1D4e3FE2")
    
    def test_model_content(self):
        self.assertEqual(self.wallet.wallet_name, "test")
        self.assertEqual(self.wallet.wallet_address, "0x207c7F9f6ced8bebF97CA833A28135db1D4e3FE2")
    
    def test_url_exists_at_correct_location(self):
        response = self.client.get("/api/wallet/")
        self.assertEqual(response.status_code, 200)

        response = self.client.get("/api/wallet/2/")
        self.assertEqual(response.data, {'id':2, 'wallet_name':'test', 'wallet_address':'0x207c7F9f6ced8bebF97CA833A28135db1D4e3FE2'})
        self.assertEqual(response.status_code, 200)

        response = self.client.get("/api/wallet/10/")
        self.assertEqual(response.status_code, 404)
    
    def test_validate_wallet_address(self):
        self.assertFalse(is_wallet_connected("incorrect address"))
        self.assertTrue(is_wallet_connected("0x207c7F9f6ced8bebF97CA833A28135db1D4e3FE2"))

        post_form = {'wallet_name':'test', 'wallet_address':'0x207c7F9f6ced8bebF97CA833A28135db1D4e3FE2'}
        response = self.client.post("/api/wallet/", post_form)
        self.assertEqual(response.status_code, 400)

        post_form = {'wallet_name':'test', 'wallet_address':'incorrect address'}
        response = self.client.post("/api/wallet/", post_form)
        self.assertEqual(response.status_code, 400)

        post_form = {'wallet_name':'new_test', 'wallet_address':'0xb78F6a6c832E02df2F7b2d1C4a4f4Cc5a2d0214c'}
        response = self.client.post("/api/wallet/", post_form)
        self.assertEqual(response.status_code, 201)
    
    def test_delete_wallet(self):
        response = self.client.delete("/api/wallet/2/")
        self.assertEqual(response.status_code, 204)
