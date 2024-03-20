# # Stage 1: Build backend
# FROM python:3.9 AS backend_builder

# WORKDIR /backend

# # Copy requirements and install dependencies
# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy the rest of the application
# COPY . .

# # Stage 2: Final image
# FROM backend_builder AS backend

# # Expose port
# EXPOSE 8000

# # Set environment variables
# ENV DJANGO_SETTINGS_MODULE=project.settings.prod
# ENV PYTHONUNBUFFERED=1

# # Run Django application
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


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