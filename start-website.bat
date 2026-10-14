@echo off
title Tattvam Markets - Local Website
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo Node.js is not installed. Please install the LTS version from https://nodejs.org and run this file again.
  start "" https://nodejs.org
  pause
  exit /b 1
)

if not exist node_modules\.bin\next.cmd (
  echo Installing packages - first run only, takes 1-3 minutes...
  call npm install
  if errorlevel 1 (
    echo npm install failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
)

echo.
echo Starting Tattvam website at http://localhost:3000
echo Keep this window open. Press Ctrl+C to stop.
start "" cmd /c "timeout /t 10 >nul & start http://localhost:3000"
call npm run dev
pause
