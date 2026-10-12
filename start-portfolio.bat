@echo off
REM Abdo Portfolio - one click starter (server + browser)
cd /d "%~dp0"
echo ============================================
echo  Abdo Portfolio - starting server...
echo ============================================
start "Abdo Portfolio - Server (do not close this window)" cmd /k node "node_modules\next\dist\bin\next" start --port 3000
echo Waiting for the server to warm up...
timeout /t 8 /nobreak >nul
start "" "http://localhost:3000"
echo Done! The portfolio is open in your browser.
echo Keep the black "Server" window open while you browse.
pause
