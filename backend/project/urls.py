from django.urls import path
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

from wallet import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("walletwatch/dev/api/wallet/", views.wallet_list),
    path("walletwatch/dev/api/balance/", views.balance_list),
    path("walletwatch/dev/api/balance/<int:pk>/", views.balance_detail),
    path("walletwatch/dev/api/wallet/<int:pk>/", views.wallet_detail),
    path("walletwatch/dev/api/network/", views.network_list),
    path("walletwatch/dev/api/network/<int:pk>/", views.network_detail),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
