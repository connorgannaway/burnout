@echo off

if exist errors.txt (
    set /p yn="Would you like me to delete errors.txt (y|n)? "
    if "%yn%"=="n" (
        exit /b 1
    ) else (
        call del errors.txt
    )
)

set /p yn="Would you like to run the linter with the --fix option (y|n)? "
set fix=""

if "%yn%"=="y" (
    set fix="--fix"
)

set dirs=components screens .

(for %%a in (%dirs%) do (
    for %%i in (%%a\*.js) do (
        if not "%%i" == ".\babel.config.js" (
            if "%fix%"=="--fix" (
                call npx eslint %fix% %cd%\%%i >> errors.txt 2>&1
            ) else (
                call npx eslint %cd%\%%i >> errors.txt 2>&1
            )     
            echo %cd%\%%i
            echo: >> errors.txt
            echo: >> errors.txt
        )
    )
))
echo:
echo Check errors.txt for the list of errors
