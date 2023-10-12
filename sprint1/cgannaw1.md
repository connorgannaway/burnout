# Sprint 1

Connor Gannaway / connorgannaway / RaceMob

### What you planned to do
- Initial project generation [#1](https://github.com/utk-cs340-fall23/RaceMob/issues/1)
- Schema Design [#11](https://github.com/utk-cs340-fall23/RaceMob/issues/11)
- Model Creation
  - [#6](https://github.com/utk-cs340-fall23/RaceMob/issues/6)
  - [#8](https://github.com/utk-cs340-fall23/RaceMob/issues/8)
  - [#10](https://github.com/utk-cs340-fall23/RaceMob/issues/10)
  - [#13](https://github.com/utk-cs340-fall23/RaceMob/issues/13)
  - [#15](https://github.com/utk-cs340-fall23/RaceMob/issues/15)
  - [#17](https://github.com/utk-cs340-fall23/RaceMob/issues/17)
  - [#41](https://github.com/utk-cs340-fall23/RaceMob/issues/41)
- Versioning bumper script and API endpoint [31](https://github.com/utk-cs340-fall23/RaceMob/issues/31)
- Production server & database setup [#45](https://github.com/utk-cs340-fall23/RaceMob/issues/57)
- API endpoint for serving dismissable messages to clients [#57](https://github.com/utk-cs340-fall23/RaceMob/issues/57)
- API endpoint for finding the nearest races to a given date [#68](https://github.com/utk-cs340-fall23/RaceMob/issues/68)
- API endpoint for serving data for a race brief card used on the app homepage [#72](https://github.com/utk-cs340-fall23/RaceMob/issues/72)

### What you did not do
I accomplished everything that I had planned to do this sprint.

### What problems you encountered
I've run into issues creating a systemd service/socket to run the backend server. I'm currently having to run it directly in a tmux window.

### Issues you worked on
[See Above](###What you planned to do)

### Files you worked on
- app/bump_version.sh
- app/backend/csv/seasons.csv
- app/backend/csv/races.csv
- app/backend/csv/disciplines.csv
- app/backend/data/admin.py
- app/backend/data/models.py
- app/backend/data/urls.py
- app/backend/data/views.py
- app/backend/pitwallapi/settings.py
- app/backend/pitwallapi/urls.py
- app/backend/pitwallapi/\_\_init\_\_.py
- app/backend/v1/serializers.py
- app/backend/v1/urls.py
- app/backend/v1/views.py

### What you accomplished
Worked on database design, implementing django models, and populating the database. Research was done by Caleb to find the best way to populate the database, and he found some postgres plugins that would be helpful, but it turns out my database IDE (Datagrip) has import/export tools that made this very easy and the plugins weren't necessary.
Worked on a messages endpoint. This allows for application messages to be enabled or disabled in the database, and enabled messages would be shown on the home screen as a dismissable card.
Worked on the nearest races and race brief endpoints. These two together create our home page. IDs for nearest races to a given date, default today, are returned by the first, and brief info about each are returned by the second.
Created a version bumper script and version API endpoint to help keep track of releases. This is useful since a backend server will always have to be running for frontend development from here on out. 
Tagged two pre-releases and got backend server running.