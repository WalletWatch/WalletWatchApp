from django.urls import path
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from os import environ

from wallet import views

path = environ.get("DJANGO_PATH", "")


urlpatterns = [
    path(path + "admin/", admin.site.urls),
    path(path + "wallet/", views.wallet_list),
    path(path + "balance/", views.balance_list),
    path(path + "balance/<int:pk>/", views.balance_detail),
    path(path + "wallet/<int:pk>/", views.wallet_detail),
    path(path + "network/", views.network_list),
    path(path + "network/<int:pk>/", views.network_detail),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
