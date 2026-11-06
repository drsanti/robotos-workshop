@echo off
rem Serve the offline interactive docs from this pack (correct web root).
rem Port 5510 — avoid 5500 (Cursor/VS Code Live Preview default = workspace root).
setlocal
cd /d "%~dp0..\online-docs"
if not exist "index.html" (
  echo online-docs\index.html missing.
  echo Instructors: rebuild with robotos-workshop-tools\scripts\ship-docs.sh
  pause
  exit /b 1
)
echo.
echo  Offline docs - http://127.0.0.1:5510/#/setup
echo  Serving: %CD%
echo  Leave this window open. Ctrl+C to stop.
echo  (Not port 5500 - that is often Live Preview on the wrong folder.)
echo.
python -m http.server 5510
if errorlevel 1 (
  echo.
  echo python failed — trying npx serve...
  npx --yes serve . -p 5510
)
pause
