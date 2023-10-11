@echo off

set /p yn="Would you like to run the linter with the --fix option (y|n)? "

set dirs=components screens .
if "%yn%"=="y" (
    (for %%a in (%dirs%) do (
    for %%i in (%%a\*.js) do (
        if not "%%i" == ".\babel.config.js" (
            call npx eslint --fix %cd%\%%i   
            echo %cd%\%%i
        )
    )
    )
)
)


(for %%a in (%dirs%) do (
    for %%i in (%%a\*.js) do (
        if not "%%i" == ".\babel.config.js" (
            call npx eslint %cd%\%%i   
            echo %cd%\%%i
        )
    )
))
echo:
