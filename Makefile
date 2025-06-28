.PHONY: backend frontend

backend:
	cd backend && uv run manage.py runserver
frontend:
	cd frontend && npm run dev