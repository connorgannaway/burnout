## Prerequisites
- pip install virtualenv
- pip -m venv django
- source django/bin/activate
- pip install -r requirements.txt
- To deactivate virtual env: 'deactivate'
## How to use 
- python3 helloplus/manage.py runserver 8080
- open web browser, if on linux type localhost:8080, if on windows, try loopback address 127.0.0.1:8080
- check out the main page at base url
- and the other pages at /helloplus and /helloworld!

This just creates a django front end, didn't configure the database which we will have to do for the project and also serve up requests with data queries on the backend.