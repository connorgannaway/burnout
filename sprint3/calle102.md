# Sprint 3

Name: Cody Allen
Github ID: codyallen9202
Group: RaceMob

### What you planned to do

- Time zones / localization
- Race card formatting

### What you did not do

 - I finished what I planned mostly, although the Race Cards still need tweaking

### What problems you encountered

 - Dealing with DST while working with the time zones
 - CSS styling is frustrating to deal with

### Issues you worked on

 - [#134](https://github.com/utk-cs340-fall23/RaceMob/issues/134)
 - [#113](https://github.com/utk-cs340-fall23/RaceMob/issues/113)
 - [#148](https://github.com/utk-cs340-fall23/RaceMob/issues/148)

### Files you worked on

 - app/frontend/burnout/api/briefs.js
 - app/frontend/burnout/components/card.js
 - app/frontend/burnout/functions/dateformat.js
 - app/frontend/burnout/functions/parsetime.js
 - app/frontend/burnout/functions/timezonecalc.js

### What you accomplished

I made a function to take in the date of a race from our API and format it in a way that looks better
on the app. I also made two functions that take in the time of a race from our API, parse it from a string
into HMS ints, and converts it into your local timezone. I also worked on formatting the race cards and adding
a bit more data onto them depending on if the race was over or not.
