# Makefile for deploying Django app on VPS

# Variables
include ../.env

.PHONY: configure_server
configure_server:
        sudo apt clean
        sudo apt update && sudo apt upgrade
        sudo apt-get update --fix-missing 
        sudo apt install -f python3 python3-venv python3-pip nginx redis-server 
        sudo apt remove npm nodejs
        sudo apt-get install -f
        curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
        sudo apt-get install -y nodejs
        sudo apt install npm
        cd ${PROJECT_DIR} 
        python3 -m venv ${PROJECT_DIR}/${VENV_NAME}  
        ${PROJECT_DIR}/env/bin/pip install -r ${PROJECT_DIR}/backend/requirements.txt
        ${PROJECT_DIR}/env/bin/pip install django
        ${PROJECT_DIR}/env/bin/pip install daphne
        ${PROJECT_DIR}/env/bin/pip install django-cors-headers
        ${PROJECT_DIR}/env/bin/pip install djangorestframework
        ${PROJECT_DIR}/env/bin/pip install psycopg2-binary web3
        ${PROJECT_DIR}/env/bin/pip install channels
        ${PROJECT_DIR}/env/bin/pip install django_extensions django_celery_beat
        ${PROJECT_DIR}/env/bin/pip install celery[redis]

.PHONY: postgresql
postgresql: 
        sudo apt install postgresql postgresql-contrib
        sudo systemctl start postgresql.service
        sudo -u postgres psql -c "CREATE DATABASE ${POSTGRES_DB};"
        sudo -u postgres psql -c "CREATE USER ${POSTGRES_USER} WITH PASSWORD '${POSTGRES_PASSWORD}';"
        sudo -u postgres psql -c "ALTER ROLE ${POSTGRES_USER} SET client_encoding TO 'utf8';"
        sudo -u postgres psql -c "ALTER ROLE ${POSTGRES_USER} SET default_transaction_isolation TO 'read committed';" 
        sudo -u postgres psql -c "ALTER ROLE ${POSTGRES_USER} SET timezone TO 'UTC';"
        sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE ${POSTGRES_DB} TO ${POSTGRES_USER};"

# Install Nginx configuration
.PHONY: nginx_conf
nginx_conf:
        sudo mkdir -p /etc/nginx/sites-enabled/ 
        sudo mkdir -p /etc/nginx/sites-available/ 
        sudo cp conf/nginx.conf /etc/nginx/sites-available/${NGINX_CONFIG} 
        sudo ln -s /etc/nginx/sites-available/${NGINX_CONFIG} /etc/nginx/sites-enabled/ 
        sudo systemctl restart nginx 

.PHONY: celery_conf
celery_conf:
        sudo cp conf/${CELERY_SERVICE} /etc/systemd/system/celery.service
        sudo systemctl daemon-reload 
        sudo systemctl start ${CELERY_SERVICE} &
        sudo systemctl enable ${CELERY_SERVICE} &

.PHONY: redis
redis:
        sudo apt-get update
        sudo apt-get install redis-server
        sudo systemctl start redis

.PHONY: daphne_conf
daphne_conf:
        sudo apt-get update
        sudo apt-get install supervisor
        sudo cp conf/${DAPHNE_SERVICE} /etc/supervisor/conf.d/daphne.conf
        sudo service supervisor restart
        sudo supervisorctl status 

.PHONY: react
react:
        cd ${PROJECT_DIR}/frontend/ && \
        npm install --force && \
        npm run build
        mkdir /var/www
	mkdir /var/www/${HOST}
        cp -r ${PROJECT_DIR}/frontend/build/* /var/www/${HOST}
        sudo systemctl restart nginx

# Deploy: Install dependencies, collect static files, run migrations, restart Gunicorn and Nginx
.PHONY: deploy
deploy: configure_server clone_repo postgresql migrate nginx-conf daphne-conf redis celery-conf

.PHONY: update
update:
        sudo systemctl daemon-reload 
        sudo systemctl restart nginx
        sudo service supervisor restart
        sudo systemctl restart selery &

# Collect static files
.PHONY: collectstatic
collectstatic: 
        python manage.py collectstatic --noinput

# Run database migrations
.PHONY: migrate
migrate: 
        ${PROJECT_DIR}/env/bin/python3 ${PROJECT_DIR}/backend/manage.py makemigrations
        ${PROJECT_DIR}/env/bin/python3 ${PROJECT_DIR}/backend/manage.py migrate

# Makefile Help
help: 
        @echo "configure_server - Install dependencies and packages"
        @echo "collectstatic - Collect static files"
        @echo "migrate - Run database migrations"
        @echo "update - Restart all process" 
        @echo "deploy - Deploy the application (install dependencies, collect static files, migrate, restart Gunicorn and Nginx)"
        @echo "ssh - SSH into the remote server"
        @echo "postgresql - Configure database"
        @echo "daphne-conf- Install daphne configuration"
        @echo "celery-conf - Install Celery configuration"
        @echo "nginx-conf - Install Nginx configuration"
        @echo "help - Display this help message"
