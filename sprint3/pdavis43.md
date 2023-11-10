# Sprint 3
---

Name: Peyton Davis 
GitHub: peytonad
Group: RaceMob

### What you planned to do
 - Fix Calendar Formatting [#127](https://github.com/utk-cs340-fall23/RaceMob/issues/127)
 - Bottom Tab Formatting [#138](https://github.com/utk-cs340-fall23/RaceMob/issues/138)
 - Pass DateRangePicker selection to the homescreen [#144](https://github.com/utk-cs340-fall23/RaceMob/issues/144)

### What you did not do
I accomplished all of the tasks I set out to do. The only thing I would say I did not finish was creating small animations for the bottom tab bar. I wanted to make small animations for each screen when selected, but it was going to be more trouble than it was worth for a small gimmick.

### What problems you encountered
 - One problem I encountered was actually getting my selected date to the homepage. Originally, I designed the calendar component as a functional component, but I had to change it to a class component in order to pass the selected dates to the homepage. I also had to use the navigation prop to pass the dates to the homepage. I spent quite a bit of time trying to figure out how to pass the dates to the homepage, but I eventually figured it out, and it was used by the rest of the team.

### Issues you worked on
 - Fix Calendar Formatting [#127](https://github.com/utk-cs340-fall23/RaceMob/issues/127)
 - Bottom Tab Formatting [#138](https://github.com/utk-cs340-fall23/RaceMob/issues/138)
 - Pass DateRangePicker selection to the homescreen [#144](https://github.com/utk-cs340-fall23/RaceMob/issues/144)

### Files you worked on
(These files are associated in the main branch of the RaceMob repo.)
 - RaceMob/app/frontend/burnout/components/DateRangePicker.js
 - RaceMmob/app/frontend/burnout/components/stack.js
 - RaceMmob/app/frontend/burnout/components/tab.js
 - RaceMob/app/frontend/burnout/screens/homescreen.js

### What you accomplished
I was able to successfully change the DateRangePicker component (calendar widget) 
into a class component. This was used to pass the selected dates to the homepage
more simply than the prior functional component. I also changed the bottom tab bar
to be more consistent with the rest of the app. The icons and page titles are larger,
and the icons change colors and become filled in when selected. Lastly, I adjusted
the calendar widget to show up in the middle of the screen when choosing a date.
This is an adjustment from the original design that would have the calendar show
up at the top of whatever screen it was on and not fit the screen well.
