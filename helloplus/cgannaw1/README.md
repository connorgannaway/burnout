## cgannaw1

This is a simple implementation of a single API endpoint using the Django backend framework and djangorestapi package. Our project requires a robust backend & api implementation, and django is powerful enough to provide that.
### To Use:
 - Make a python virtual enviroment however you wish & activate. Then run the following commands:
 - `pip install -r requirements.txt`
 - `cd helloplus`
 - `python manage.py migrate` (this creates the local database)
 - `python manage.py runserver`

 You can now navigate to 127.0.0.1:8000/api/person to interact with the simple api

 GET: get all persons

 POST: Create a person. Requires a `FirstName` & `LastName` argument in json format.