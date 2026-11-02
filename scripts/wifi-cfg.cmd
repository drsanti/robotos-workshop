@echo off
setlocal EnableExtensions
cd /d "%~dp0\.."

rem Thin wrapper: PATH + default ROBOTOS_CONNECT, then wifi-cfg.exe
rem Requires scripts\start-bridge.cmd already running (--cmd-topic all).

set "ROOT=%CD%"
set "ROBOTOS_BIN=%ROOT%\code\robotos-v0.3.0-windows-x64\bin"
if not exist "%ROBOTOS_BIN%\wifi-cfg.exe" (
  echo  Missing %ROBOTOS_BIN%\wifi-cfg.exe
  echo  Rebuild from robotos: cargo build --release -p serial-bridge --bin wifi-cfg
  exit /b 1
)
set "Path=%ROBOTOS_BIN%;%Path%"
if not defined ROBOTOS_CONNECT set "ROBOTOS_CONNECT=tcp/127.0.0.1:7447"

if "%~1"=="" (
  echo.
  echo  Usage examples ^(bridge must be running^):
  echo    scripts\wifi-cfg.cmd --enable
  echo    scripts\wifi-cfg.cmd --ssid YOUR_SSID --pass YOUR_PASSWORD --connect tcp/192.168.0.200:7447
  echo    scripts\wifi-cfg.cmd --reconnect
  echo    scripts\wifi-cfg.cmd --disable
  echo.
  echo  Use your PC LAN IP in --connect ^(not 127.0.0.1 — the board cannot reach that^).
  echo  Watch status: scripts\run.cmd hw-02 board_watch
  echo.
  wifi-cfg.exe --help
  exit /b 0
)

wifi-cfg.exe %*
exit /b %ERRORLEVEL%
