@echo off
setlocal EnableExtensions
cd /d "%~dp0"

rem Double-click this file (Windows). Sets PATH + Python venv for THIS window only.

set "ROBOTOS_BIN=%~dp0code\robotos-v0.3.0-windows-x64\bin"
if not exist "%ROBOTOS_BIN%\robotos.exe" (
  echo.
  echo  Missing %ROBOTOS_BIN%\robotos.exe
  echo  Unzip/clone the full workshop so code\robotos-v0.3.0-windows-x64\exists.
  echo.
  pause
  exit /b 1
)
set "Path=%ROBOTOS_BIN%;%Path%"

echo.
echo  robotos-workshop
echo  ----------------
echo  This window is ready for CLI + Python labs.
echo  PATH lasts only here — double-click again for a new terminal.
echo.

rem First-time: create .venv and install the Windows wheel
if not exist ".venv\Scripts\python.exe" (
  echo  First time: creating .venv and installing the robotos wheel ...
  where py >nul 2>&1 && (
    py -3 -m venv .venv
  ) || (
    python -m venv .venv
  )
  if errorlevel 1 (
    echo  Could not create .venv — install Python 3 from python.org ^(check "Add to PATH"^).
    pause
    exit /b 1
  )
  call ".venv\Scripts\activate.bat"
  python -m pip install -U pip
  python -m pip install "%~dp0code\robotos-0.3.0-py3-none-win_amd64.whl"
  if errorlevel 1 (
    echo  Wheel install failed — see SETUP.md
    pause
    exit /b 1
  )
  echo  .venv ready.
  echo.
) else (
  call ".venv\Scripts\activate.bat"
)

rem Warehouse sim (leave it open; do not re-launch every new terminal)
if exist "%~dp0code\robotos-sim-v0.1.0-windows-x64\robotos-sim.exe" (
  echo  Starting warehouse sim ^(if not already open^) ...
  start "" "%~dp0code\robotos-sim-v0.1.0-windows-x64\robotos-sim.exe"
  echo.
)

echo  Quick checks:
echo    robotos version
echo    robotos topic list
echo.
echo  Example lab ^(workshop root — stay here^):
echo    python labs\wh\wh-01-drive-twist\starter\drive_forward.py
echo.
echo  Board labs ^(HW^): open start-bridge.cmd in a SECOND window, leave it running.
echo  Full guide: SETUP.md
echo.

cmd /k
