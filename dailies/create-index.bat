@echo off

rem create a new file called "index.html"
echo > index.html

rem write the html header to the file
echo ^<html^>^<head^>^<title^>Index of all daily HTML files^</title^>^</head^>^<body^> >> index.html

rem find all html files in the current directory and its subdirectories
for /r %%i in (*.html) do (
  rem write the file as a link to the index.html file
  echo ^<a href="%%~fi"^>%%~fi^</a^>^<br^> >> index.html
)

rem write the html footer to the file
echo ^</body^>^</html^> >> index.html