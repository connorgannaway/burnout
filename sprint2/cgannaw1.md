# Sprint 2

Connor Gannaway / connorgannaway / Racemob

### What you planned to do
- [#81](https://github.com/utk-cs340-fall23/RaceMob/issues/81) Create an endpoint for all details about a single race
- [#100](https://github.com/utk-cs340-fall23/RaceMob/issues/100) Create an endpoint to list all leagues and their ids
- [#94](https://github.com/utk-cs340-fall23/RaceMob/issues/94) Create an endpoint for listing all current championship data for a league and season.
- Minor changes/work on deployment
### What you did not do
- Create a solution for keeping our database up to date via multiple external APIs.
### What problems you encountered
- Finding a good/efficient solution to the problem above is challenging

### Issues you worked on
Linked above

### Files you worked on
- app/backend/data/migrations/0001_initial.py
- app/backend/data/models.py
- app/backend/v1/urls.py
- app/backend/v1/views.py

### What you accomplished
I focused on some of the more challenging endpoints for the backend API. This includes a race detail endpoint to be queried whenever a race is clicked on in the app. This will return all of the information about the specific race. 

Another endpoint was developed for a specific league to be queried when navigating to a league from the app. This endpoint will return all of the race IDs for that season and information about the current drivers and constructors championship standings. Also, an endpoint to list all leagues and their IDs was created.
