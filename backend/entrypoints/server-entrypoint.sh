#!/bin/bash

until uv run manage.py migrate
do
    echo "Waiting for db to be ready..."
    sleep 2
done

until uv run manage.py collectstatic --no-input
do
    echo "Docker: collecting static"
done

echo "Docker: start django application"
uv run manage.py runserver 0.0.0.0:8000