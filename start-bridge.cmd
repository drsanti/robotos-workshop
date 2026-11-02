@echo off
setlocal EnableExtensions
cd /d "%~dp0"

rem Second window for HW labs — leave this open while you work in start-here.cmd.

set "ROBOTOS_BIN=%~dp0code\robotos-v0.3.0-windows-x64\bin"
if not exist "%ROBOTOS_BIN%\serial-bridge.exe" (
  echo  Missing serial-bridge.exe under code\robotos-v0.3.0-windows-x64\bin
  pause
  exit /b 1
)
set "Path=%ROBOTOS_BIN%;%Path%"
set "ROBOTOS_LISTEN=tcp/0.0.0.0:7447"

echo.
echo  robotos-workshop — serial-bridge ^(board^)
echo  -----------------------------------------
echo  Plug in the ESP32-S3 USB cable first.
echo  Leave this window open. Use start-here.cmd for labs.
echo.
echo  Default: --port auto. If it fails, edit this file or run:
echo    serial-bridge --port COM17 --baud 921600 --robot-id 01 --cmd-topic all
echo  ^(use your USB Serial Device COM number from Device Manager^)
echo.

serial-bridge --port auto --baud 921600 --robot-id 01 --cmd-topic all --probe-settle-ms 2000 --probe-ms 5000
echo.
echo  Bridge exited. Press a key to close.
pause
