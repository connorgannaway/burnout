# Sprint 3

Andrew Lindstrom | alindstr | aglindstrom | RaceMob

### What you planned to do
* Populate tables with standings data
* Propperly link cells buttons to pages
* load most recent race data into league master page header
* Finish league master page heading animations

### What you did not do
* Finish league master page heading animations

### What problems you encountered
* Loading link id's for cell buttons seperate from cell data
* measuring component sizes for animations is way more difficult than it sounds

### Issues you worked on
[Finish League Page Layout [PIT-82] #107](https://github.com/utk-cs340-fall23/RaceMob/issues/107)
[Implement API for leagues and league details #129](https://github.com/utk-cs340-fall23/RaceMob/issues/129)
[Populate league master page tables with server data #130](https://github.com/utk-cs340-fall23/RaceMob/issues/130)
[Make table components pressable #132](https://github.com/utk-cs340-fall23/RaceMob/issues/132)

### Files you worked on
* table.js
* briefs.js
* leaguemasterscreen.js
  
### What you accomplished
I retrieved data from the server for the league standings, and the most recent race. After retrieving that data I 
broke it into elements that could be processed by the table component. I linked each cell to its respective
master page, and provided that link with the correct Id to populate the page with data. I also cleaned up the design
for the league master page, and began working on animations for overflow heading text.