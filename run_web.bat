@echo off
echo ===================================================
echo     Building and Running LughatDad Web Server
echo ===================================================
echo.

if not exist "javacc.jar" (
    echo [0] Downloading JavaCC...
    curl -L -o javacc.jar https://repo1.maven.org/maven2/net/java/dev/javacc/javacc/7.0.13/javacc-7.0.13.jar
    if %errorlevel% neq 0 (
        echo Failed to download JavaCC!
        pause
        exit /b %errorlevel%
    )
    echo Download successful!
    echo.
)

echo [1] Running JavaCC...
java -cp javacc.jar javacc LughatDad.jj
if %errorlevel% neq 0 (
    echo JavaCC Build Failed!
    pause
    exit /b %errorlevel%
)
echo Build Successful!
echo.

echo [2] Compiling Java classes...
javac -encoding UTF-8 *.java
if %errorlevel% neq 0 (
    echo Java Compilation Failed!
    pause
    exit /b %errorlevel%
)
echo Compilation Successful!
echo.

echo [3] Starting Local Web Server...
echo Please open the following URL in your browser:
echo http://localhost:8000
echo.
python server.py
pause
