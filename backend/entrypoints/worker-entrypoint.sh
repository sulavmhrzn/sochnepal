#!/bin/sh

echo "Docker: Start worker service"
uv run celery -A core worker -l INFO