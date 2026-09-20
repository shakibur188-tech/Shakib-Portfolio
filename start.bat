@echo off
title Shakibur Rahaman Portfolio CMS Server
echo ========================================================
echo   Md. Shakibur Rahaman Portfolio & Admin CMS Launcher
echo ========================================================
echo.
echo Checking Node.js runtime...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [NOTE] Node.js is not found in PATH.
    echo Launching built-in Windows HTTP server on http://localhost:5500 ...
    start http://localhost:5500/
    powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
    exit /b
)

echo Starting local CMS server on http://localhost:5500 ...
echo.
echo - Public Website:  http://localhost:5500/
echo - Admin Dashboard: http://localhost:5500/admin
echo - Default Admin:   username: admin ^| password: admin1234
echo.
echo Opening portfolio in your default browser...
start http://localhost:5500/
echo.
echo Server active. Press CTRL+C in this window to stop the server anytime.
node server.js
pause
