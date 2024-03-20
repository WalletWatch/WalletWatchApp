# Dockerfile
FROM python:3.9
ENV PYTHONUNBUFFERED 1
RUN mkdir /backend
WORKDIR /backend
COPY requirements.txt /backend/
RUN pip install -r requirements.txt
RUN find . -path "*/__pycache__*" -delete
RUN find . -name "*.pyc" -exec rm -f {} \
COPY . /backend/