@echo off
setlocal EnableExtensions
cd /d "%~dp0\.."

rem Prefer workshop .venv if present
set "PY=python"
if exist ".venv\Scripts\python.exe" set "PY=.venv\Scripts\python.exe"

"%PY%" "%~dp0run.py" %*
exit /b %ERRORLEVEL%
