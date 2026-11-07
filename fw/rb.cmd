@echo off
setlocal EnableExtensions EnableDelayedExpansion
set "HERE=%~dp0"
set "EXE=%HERE%rbdev\windows\rbdev.exe"
if not exist "%EXE%" (
  echo missing %EXE% - ask instructor or rebuild rbdev 1>&2
  exit /b 1
)

REM rbdev defaults to firmware-prebuilt\<board>\ under a sibling HI workshop.
REM In this pack, bins live next to this wrapper — inject --dir when needed.
if /I not "%~1"=="flash-bin" goto :run

set "HAS_DIR=0"
set "BOARD=%RBDEV_BOARD%"
set "PREV="
for %%A in (%*) do (
  set "ARG=%%~A"
  if /I "!ARG!"=="--dir" set "HAS_DIR=1"
  echo.!ARG!| findstr /I /B /C:"--dir=" >nul && set "HAS_DIR=1"
  if /I "!PREV!"=="--board" set "BOARD=%%~A"
  echo.!ARG!| findstr /I /B /C:"--board=" >nul && (
    set "BOARD=!ARG:--board=!"
  )
  set "PREV=%%~A"
)
if "!HAS_DIR!"=="1" goto :run
if "!BOARD!"=="" set "BOARD=es3c28p"
if not exist "%HERE%!BOARD!\flash_args" goto :run

for /f "tokens=1*" %%A in ("%*") do (
  "%EXE%" flash-bin --dir "%HERE%!BOARD!" %%B
)
exit /b %ERRORLEVEL%

:run
"%EXE%" %*
exit /b %ERRORLEVEL%
