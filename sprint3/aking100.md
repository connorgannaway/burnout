# Sprint 3

Aaron King, aaronpig9, RaceMob

### What you planned to do

- Teammasterscreen API Data [#124](https://github.com/utk-cs340-fall23/RaceMob/issues/124)
- Query API Data for Drivers [#141](https://github.com/utk-cs340-fall23/RaceMob/issues/141)
- Implement API Data for Drivers Screen [#142](https://github.com/utk-cs340-fall23/RaceMob/issues/142)

### What you did not do

- I did everything I planned to do

### What problems you encountered

- I had to figure out how to pass the team id to the query page to query the 
correct team's info
- I had to figure out how to pass the navigation to the query page to navigate
to driver page from team page

### Issues you worked on

- [#124](https://github.com/utk-cs340-fall23/RaceMob/issues/124)
- [#141](https://github.com/utk-cs340-fall23/RaceMob/issues/141)
- [#142](https://github.com/utk-cs340-fall23/RaceMob/issues/142)

### Files you worked on

- app/frontend/burnout/api/teamdetails.js
- app/frontend/burnout/api/driverdetails.js
- app/frontend/burnout/screens/teammasterscreen.js
- app/frontend/burnout/screens/drivermasterscreen.js
- app/frontend/burnout/components/card.js
- app/frontend/burnout/components/stack.js
- app/frontend/burnout/components/SearchBar.js

### What you accomplished

I made two files to query the API and grab data. I made these files generate 
the cards that are viewed and return them to the screen calling the query. 
I then edited the drivermasterscreen and teammasterscreen to display the data 
being queried from the API. I had to add another route param in order to be 
able to pass the correct team or driver id to the screen to pull data. 
I also had to fix an issue we had when merging the search bar into the header 
bar, but I did not make an issue out of that, only a commit.