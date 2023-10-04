## Backend
# Pylint, Autoflake, and iSort
- `Autoflake`: To check files `autoflake --check .`, to apply changes `autoflake .`, will run recursively and will exclude v1/
- `iSort`: To check files `isort --check .`, to apply changes `isort .`, will run recursively and will exclude v1/, \_\_pycache\_\_/, and .venv/
- `Pylint`: Not configured yet
# General Note
If you add a `#noqa` as a comment on a line with an unused import, autoflake will not remove it and isort *should* skip it

## Frontend
- Pulling: When you pull from a branch, always make sure to run `npm install` to get the new dependencies
- Adding dependencies: If you need to add a dependency to make code work just run `npm install [package]`, if it's only for code management, etc. run `npm install [package] --save-dev`
# ESlint
- Linting: Before you add or commit, and **especially** before you push to a branch, please run `lint.sh` or `lint.bat` if you're on UNIX/Windows, respectively. We are using this to enfore good code practice and a style guide. Errors will be put into errors.txt, you can fix them by answering yes to the --fix option when it prompts you.