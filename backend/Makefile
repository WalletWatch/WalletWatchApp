.PHONY: prepare-python
prepare-python:
	pip install -r requirements.txt --no-input

.PHONY: migration
migration:
	python3 manage.py collectstatic --noinput && \
	python3 manage.py makemigrations && \
	python3 manage.py migrate

.PHONY: run-server
run-django:
	redis cli && \
	python3 manage.py runserver && \
	celery -A project worker --loglevel=info --beat 

