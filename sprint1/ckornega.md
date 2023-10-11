## Sprint 1
Caleb Kornegay CalebKornegay RaceMob

# What I planned to do 
- Linting [#49](https://github.com/utk-cs340-fall23/RaceMob/issues/49) 
- Models [#19-29 odd](https://github.com/utk-cs340-fall23/RaceMob/issues/19)
- Create card [#40](https://github.com/utk-cs340-fall23/RaceMob/issues/40)
- Navigation [#66](https://github.com/utk-cs340-fall23/RaceMob/issues/66)

# What I didn't get done
- Linting and supporting scripts for the backend development


# What problems I encountered
- Scripting differences between linux/windows
- Some nested navigation that had to be resolved

# What I worked on 
- Mentioned [here](#what-i-planned-to-do)

# Files I worked on 
- app/frontend/burnout/.eslintrc.json
- app/frontend/burnout/App.js
- app/frontend/burnout/lint.sh
- app/frontend/burnout/lint.bat
- app/frontend/burnout/components/stack.js
- app/frontend/burnout/components/tab.js
- app/frontend/burnout/components/card.js
- app/backend/pyproject.toml
- app/backend/data/models.py

# What I accomplished
Set up stack navigation and then transitioned into a tab navigator so that we can have separate stacks per tab, and we can render multiple pages through clickable cards.  
Set up clickable cards to pass navigation around so that we can add another screen onto the stack.  
Created linting configurations and scripts to run against our code base to help enforce some semblance of a style guide.  
Added models to the backend to configure the tables for the database.