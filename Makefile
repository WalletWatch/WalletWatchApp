PROJECT_DIR = /root/WalletWatchApp

prepare-python:
	cd backend & \
	pip install -r requirements.txt --no-input

prepare-npm:
	cd client && \
	npm install

migration:
	cd backend && \
	python3 manage.py collectstatic --noinput && \
	python3 manage.py makemigrations && \
	python3 manage.py migrate

run-server:
	cd backend && \
	python3 manage.py collectstatic --noinput && \
	python3 manage.py makemigrations && \
	python3 manage.py migrate
	python3 manage.py runserver

run-client:
	cd client && \
	npm start

reload:
	sudo systemctl restart nginx;
	sudo service supervisor restart;
	sudo systemctl restart celery.service &

deploy: prepare migration reload
