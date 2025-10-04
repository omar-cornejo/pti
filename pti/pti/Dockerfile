# syntax=docker/dockerfile:1
FROM python:3.13-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PORT=8000 \
    FLASK_ENV=production

WORKDIR /app

# System deps (if needed, minimal)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt && pip install --no-cache-dir gunicorn==23.0.0

# Copy source
COPY . /app

# Create instance folder for SQLite/uploads
RUN mkdir -p /app/instance/uploads && chown -R 1000:1000 /app

# Expose port
EXPOSE 8000

# Healthcheck (optional)
HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD wget -qO- http://localhost:${PORT}/ || exit 1


# Start with gunicorn (bind 0.0.0.0, 4 workers)
CMD exec gunicorn --bind 0.0.0.0:${PORT} --workers 4 --timeout 120 --access-logfile - --error-logfile - run:app
