@echo off
rem Local companion for interactive docs. Windows binary ships when built on a Windows host.
setlocal
set "ROOT=%~dp0.."
cd /d "%ROOT%"
set "ROBOTOS_BIN=%ROOT%\code\robotos-v0.3.0-windows-x64\bin"
if not exist "%ROBOTOS_BIN%\workshop-host.exe" (
  echo workshop-host.exe not in this pack yet.
  echo Docs still work Copy-only: https://drsanti.github.io/robotos-workshop-docs/
  echo Instructors: build with robotos-workshop-tools\scripts\ship-host.ps1
  pause
  exit /b 1
)
set "PATH=%ROBOTOS_BIN%;%PATH%"
echo.
echo  robotos-workshop — workshop-host (interactive docs)
echo  -------------------------------------------------
echo  Open the URL printed below. Site: https://drsanti.github.io/robotos-workshop-docs/
echo  Leave this window open.
echo.
"%ROBOTOS_BIN%\workshop-host.exe" --workshop-root "%ROOT%" --api-only
pause
