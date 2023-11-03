# Sprint 2
---

Name: Peyton Davis 
GitHub: peytonad
Group: RaceMob

### What you planned to do
 - Add Calendar to Homepage [#79](https://github.com/utk-cs340-fall23/RaceMob/issues/79)
 - Add search to homepage [#109](https://github.com/utk-cs340-fall23/RaceMob/issues/109)
 - Having calendar dates filter queries through API - this was accomplished in the same branch as #79,
   I did not open an issue for it.

### What you did not do
I accomplished 2.75 of the 3 issues that I set out to do! The third issue of filtering queries with the
calendar dates was mostly completed. I was able to return and log the chosen calendar dates, but it
did not tie to an API call. So, everything is set up for the next sprint to be able to filter queries.

### What problems you encountered
 - One problem I encountered was simply knowing which directories to work in and what files represented
 what on the front end. During Sprint #1, I worked mostly on my own branch, as I was making components. 
 During this sprint, I needed to make my components work on the main branch, so it took a while to 
 work my way around the code. 
 - Another problem I encountered was getting the search bar to toggle with the title of each page.
 This became an issue when I realized the title text was persisting through the text box of the
 search bar. I created a state for the title to fix this issue when the search icon was toggled. 

### Issues you worked on
 - Add Calendar to Homepage [#79](https://github.com/utk-cs340-fall23/RaceMob/issues/79)
 - Add search to homepage [#109](https://github.com/utk-cs340-fall23/RaceMob/issues/109)
 - Having calendar dates filter queries through API - this was accomplished in the same branch as #79,
   I did not open an issue for it.

### Files you worked on
(These files are associated in the main branch of the RaceMob repo.)
 - RaceMob/app/frontend/burnout/components/DateRangePicker.js
 - RaceMob/app/frontend/burnout/components/SearcgBar.js
 - RaceMmob/app/frontend/burnout/components/stack.js
 - I also updated some of the libraries in the package.json file.

### What you accomplished
I was able to successfully merge my components into the frontend of the application.
The calendar widget shows up when the pre-existing calendar icon is toggled. Two dates
are selected and returned to the console - soon to be adjusting the middle layer API.
I also successfully added a search bar to the home page, leagues page, and team page.
The search bar is toggled when the magnifying glass icon is clicked. It returns the
entered text for future querying and filtering of results for users. The title of the
current page is also toggled for visibility - in addition to the search box - when the 
icon is toggled.
