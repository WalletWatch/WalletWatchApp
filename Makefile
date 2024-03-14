PROJECT_DIR = /root/wallet_watch_app

.PHONY: prepare-python
prepare-python:
	cd backend & \
	pip install -r requirements.txt --no-input

.PHONY: prepare-npm
prepare-npm:
	cd client && \
	npm install

.PHONY: migration
migration:
	cd backend && \
	python3 manage.py collectstatic --noinput && \
	python3 manage.py makemigrations && \
	python3 manage.py migrate

.PHONY: run-server
run-server:
	cd backend && \
	python3 manage.py collectstatic --noinput && \
	python3 manage.py makemigrations && \
	python3 manage.py migrate
	python3 manage.py runserver

.PHONY: run-client
run-client:
	cd client && \
	npm start

.PHONY: reload
reload:
	sudo systemctl restart nginx;
	sudo service supervisor restart;
	sudo systemctl restart celery.service &

.PHONY: deploy
deploy: prepare migration reload
