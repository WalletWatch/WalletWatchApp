from django.urls import path
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from os import environ

from wallet import views

urlpatterns = [
    path("api/admin/", admin.site.urls),
    path("api/wallet/", views.wallet_list),
    path("api/balance/", views.balance_list),
    path("api/balance/<int:pk>/", views.balance_detail),
    path("api/wallet/<int:pk>/", views.wallet_detail),
    path("api/network/", views.network_list),
    path("api/network/<int:pk>/", views.network_detail),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
