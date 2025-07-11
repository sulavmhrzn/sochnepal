.PHONY: backend frontend

backend:
	cd backend && uv run manage.py runserver
frontend:
	cd frontend && npm run dev

up:
	docker compose up

build:
	docker compose build

fresh:
	docker compose down --volumes && docker compose build && docker compose up