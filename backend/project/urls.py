from django.urls import path
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from os import environ

from wallet import views

PATH = environ.get("DJANGO_PATH", "")

urlpatterns = [
    path(PATH + "admin/", admin.site.urls),
    path(PATH + "wallet/", views.wallet_list),
    path(PATH + "balance/", views.balance_list),
    path(PATH + "balance/<int:pk>/", views.balance_detail),
    path(PATH + "wallet/<int:pk>/", views.wallet_detail),
    path(PATH + "network/", views.network_list),
    path(PATH + "network/<int:pk>/", views.network_detail),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
