# Sprint 2

Aaron King, aaronpig9, RaceMob

### What you planned to do

- TeamMasterScreen Layout Template [#86](https://github.com/utk-cs340-fall23/RaceMob/issues/86)
- Make Dynamic Titles on Pages [#95](https://github.com/utk-cs340-fall23/RaceMob/issues/95)
- Pull Team Data from API [#103](https://github.com/utk-cs340-fall23/RaceMob/issues/103)
- Team Endpoint [#88](https://github.com/utk-cs340-fall23/RaceMob/issues/88)

### What you did not do

- I did not create the Team Endpoint.

### What problems you encountered

- I did not know how to create endpoint on the API.
- I did not know much about how the backend functioned at first.
- Passing props to the navigation function made it tricky to also pass route params.

### Issues you worked on

- [#86](https://github.com/utk-cs340-fall23/RaceMob/issues/86)
- [#95](https://github.com/utk-cs340-fall23/RaceMob/issues/95)
- [#103](https://github.com/utk-cs340-fall23/RaceMob/issues/103)

### Files you worked on
(Give a bulleted list of the files in your github repo that you worked on. Give the full pathname.)

- app/frontend/burnout/screens/leaguesscreen.js
- app/frontend/burnout/screens/teammasterscreen.js
- app/frontend/burnout/screens/drivermasterscreen.js
- app/frontend/burnout/components/card.js
- app/frontend/burnout/components/stack.js
- app/frontend/burnout/api/teams.js
- app/frontend/burnout/api/urls.js

### What you accomplished

I made the basic layout for how the team master screen will look. This is 
basically just the team statistics at the top with a list of drivers at the 
bottom. Eventually this data will all be filled from the API, but for now it 
is just temporary placeholder data.
I made it where the title on the header bar is able to be passed to the route 
in the navigation function. This makes it so that we can set the titles to be 
different based on the different screens. For example, if we click on a 
driver's specific screen, it will have their name at the top instead of just 
a generic title that says "Driver".
I setup the teams.js file which pulls data from the API Teams endpoint which 
returns the team name and their current points. In the future this endpoint 
will return more data like drivers on that team, etc.