@echo off
setlocal enabledelayedexpansion

rem create a new file called "index.html"
echo > index.html

rem write the html header to the file
echo ^<html^>^<head^>^<title^>Index of all daily HTML files^</title^>^</head^>^<body^> >> index.html

rem Get the current directory and add a backslash at the end
set "CURRENT_DIR=%CD%\"

rem find all html files in the current directory and its subdirectories
for /r %%i in (*.html) do (
  rem Get relative path by replacing the current directory part with nothing
  set "REL_PATH=%%i"
  set "REL_PATH=!REL_PATH:%CURRENT_DIR%=!"

  rem Replace backslashes with forward slashes and prepend with ./
  set "REL_PATH=!REL_PATH:\=/!"
  set "REL_PATH=./!REL_PATH!"

  rem write the file as a link to the index.html file
  echo ^<a href="!REL_PATH!"^>!REL_PATH!^</a^>^<br^> >> index.html
)

rem write the html footer to the file
echo ^</body^>^</html^> >> index.html

endlocal
