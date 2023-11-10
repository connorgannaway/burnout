# Sprint 3

Connor Gannaway / connorgannaway / Racemob

### What you planned to do
- [#117](https://github.com/utk-cs340-fall23/RaceMob/issues/117) Create an endpoint for driver details and performance
- [#100](https://github.com/utk-cs340-fall23/RaceMob/issues/120) Create an endpoint for team details and performance
- (Issue doesn't exist on GitHub yet, only JIRA. Not Completed) Work on a way to keep our database updated with current/live data
- (Deployment, no GitHub Issue) Work towards modifying our deployment to use gunicorn & nginx managed by systemd instead of running in a tmux screen.
### What you did not do
I worked torwards everything I had planned, but did not finish the database/live data issue.

### What problems you encountered
- Finding a good/efficient solution to getting current data is challenging

### Issues you worked on
Linked above

### Files you worked on
- app/backend/v1/urls.py
- app/backend/v1/views.py

### What you accomplished
I created the two final endpoints that we had planned initially for our app's features and worked with other team members to have the api return data in a manner consistent with our user interface.

I worked on setting up a couple things related to our deployment so that hopefully we can migrate away from tmux during sprint 4.

I continued to devise a way to keep our data updated and begun testing that.
