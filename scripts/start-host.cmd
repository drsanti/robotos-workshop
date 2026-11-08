@echo off
rem Local companion for interactive docs Connect / Run.
setlocal
rem Resolve scripts\.. to a clean absolute path (avoid …\scripts\.. in Your setup).
cd /d "%~dp0.."
set "ROOT=%CD%"
set "ROBOTOS_BIN=%ROOT%\code\robotos-v0.3.0-windows-x64\bin"
if not exist "%ROBOTOS_BIN%\workshop-host.exe" (
  echo docs companion (workshop-host.exe) is not in this pack.
  echo Docs still work Copy-only: https://drsanti.github.io/robotos-workshop-docs/
  echo Ask your instructor if you need Connect / Run.
  pause
  exit /b 1
)
set "PATH=%ROBOTOS_BIN%;%PATH%"
if not defined RUST_LOG set "RUST_LOG=workshop_host=info,robotos=warn,zenoh=error"
echo.
echo  robotos-workshop — docs companion
echo  --------------------------------
echo  Leave this window open. Look for the yellow Bearer token in the cyan box (once).
echo  Site: https://drsanti.github.io/robotos-workshop-docs/
echo  Binary: workshop-host.exe (local helper for Connect / Run / Live)
echo.
rem Fail fast if :7420 is taken (Studio host should be :7421).
netstat -ano | findstr /R /C:":7420 .*LISTENING" >nul 2>&1
if not errorlevel 1 (
  echo error: port 7420 is already in use — docs companion needs it.
  echo   robotos-studio uses :7421. Stop whatever is on :7420, then retry.
  echo   Tip: netstat -ano ^| findstr :7420
  pause
  exit /b 1
)
"%ROBOTOS_BIN%\workshop-host.exe" --workshop-root "%ROOT%" --api-only --docs-origin "https://drsanti.github.io/robotos-workshop-docs"
pause
