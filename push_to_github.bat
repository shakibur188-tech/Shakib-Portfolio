@echo off
title Push Shakib Portfolio to GitHub
echo ========================================================
echo   Pushing Portfolio to https://github.com/shakibur188-tech/Shakib-Portfolio.git
echo ========================================================
echo.
set "GIT_EXE=C:\Users\MSI\.gemini\antigravity\scratch\mingit\cmd\git.exe"
cd /d "%~dp0"
"%GIT_EXE%" add .
"%GIT_EXE%" commit -m "feat: update portfolio files"
echo.
echo Now pushing to GitHub. (If prompted, enter your GitHub username & Personal Access Token / password):
echo.
"%GIT_EXE%" push -u origin main
echo.
echo ========================================================
echo   Done! Check your repository: https://github.com/shakibur188-tech/Shakib-Portfolio
echo ========================================================
pause
