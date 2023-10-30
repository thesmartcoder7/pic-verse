run:
	python manage.py runserver

check:
	python manage.py check --deploy

shell:
	python manage.py shell

super:
	python manage.py createsuperuser

migrations:
	python manage.py makemigrations && python manage.py migrate

test:
	python manage.py test

static files:
	python manage.py collectstatic

active:
	pipenv shell

js:
	tsc app/static/app/js/*.ts -w

dependencies:
	pipenv sync

