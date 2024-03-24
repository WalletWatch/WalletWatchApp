from pathlib import Path
import os
from os import environ

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = "django-insecure-g972hqw-n)m=oh5kkmc89hl_t342%^5ngp)7@9aq2*oa8u5_fl"

DEBUG = True

ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    "daphne",
    'django_extensions',
    "django_celery_beat",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "wallet.apps.WalletConfig",
    "rest_framework",
]


ASGI_APPLICATION = "project.asgi.application"
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [(os.environ.get("REDIS_HOST", "localhost"), 6379)],
        },
    }
}

HOST_REDIS = os.environ.get("REDIS_HOST", "localhost")
HOST_PG = os.environ.get("PSQL_HOST", "localhost")
USER_PG = os.environ.get("PSQL_USER", "postgres")
PW_PG = os.environ.get("PSQL_PASSWORD", "2608")
DB_PG = os.environ.get("PSQL_NAME", "wallet")

CELERY_BROKER_URL = "redis://" + HOST_REDIS + ":6379"
CELERY_RESULT_BACKEND = f'db+postgresql://{USER_PG}:{PW_PG}@{HOST_PG}:5432/{DB_PG}'
CELERY_IMPORTS = ("wallet.tasks",)


MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

CORS_ORIGIN_ALLOW_ALL = True
ROOT_URLCONF = "project.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": environ.get("PSQL_NAME"),
        "USER": environ.get("PSQL_USER"),
        "PASSWORD": environ.get("PSQL_PASSWORD"),
        "HOST": environ.get("PSQL_HOST"),
        "PORT": environ.get("PSQL_PORT"),
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


STATIC_URL = "static/"
STATIC_ROOT = os.path.join(BASE_DIR, 'static/')

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
