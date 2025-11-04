@echo off
REM ============================================================================
REM Client Generation Script for Windows (PowerShell)
REM ============================================================================
REM This script generates TypeScript API client from OpenAPI specification
REM Usage: .\generate-client.bat [base-url] [backend-project-path]
REM Examples:
REM   .\generate-client.bat
REM   .\generate-client.bat http://localhost:5000
REM   .\generate-client.bat http://api.example.com ..\..\backend\.NET\template
REM ============================================================================

setlocal enabledelayedexpansion

echo.
echo ============================================================================
echo  API CLIENT GENERATION
echo ============================================================================
echo.

REM Default values
set "BASE_URL=http://localhost:5000"
set "BACKEND_PROJECT=..\..\backend\.NET\template"
set "OUTPUT_DIR=..\generated"
set "SCRIPT_DIR=%~dp0"

REM Parse command line arguments
if not "%1"=="" (
    set "BASE_URL=%1"
)
if not "%2"=="" (
    set "BACKEND_PROJECT=%2"
)

echo [INFO] Base URL: %BASE_URL%
echo [INFO] Backend Project: %BACKEND_PROJECT%
echo [INFO] Output Directory: %OUTPUT_DIR%
echo.

REM Check if backend project exists
if not exist "%SCRIPT_DIR%%BACKEND_PROJECT%" (
    echo [ERROR] Backend project not found at: %SCRIPT_DIR%%BACKEND_PROJECT%
    exit /b 1
)

REM Check if the API is running
echo [INFO] Checking if API is running at %BASE_URL%...
powershell -NoProfile -Command "try { $null = Invoke-WebRequest -Uri '%BASE_URL%/health' -ErrorAction Stop; Write-Host '[OK] API is running' } catch { Write-Host '[WARNING] API might not be running. Starting it...'; exit 1 }"

if errorlevel 1 (
    echo [INFO] Attempting to start the API...
    cd /d "%SCRIPT_DIR%%BACKEND_PROJECT%"
    start cmd /k "dotnet run"
    timeout /t 5 /nobreak
    cd /d "%SCRIPT_DIR%"
)

REM Download OpenAPI spec
echo.
echo [INFO] Downloading OpenAPI specification from %BASE_URL%/openapi/v1.json...
powershell -NoProfile -Command "Invoke-WebRequest -Uri '%BASE_URL%/openapi/v1.json' -OutFile 'openapi-spec.json'" || (
    echo [ERROR] Failed to download OpenAPI specification
    echo [HINT] Ensure the API is running at %BASE_URL%
    exit /b 1
)

echo [OK] OpenAPI specification downloaded

REM Generate TypeScript client
echo.
echo [INFO] Generating TypeScript client...

if not exist "%SCRIPT_DIR%openapi-spec.json" (
    echo [ERROR] OpenAPI spec not found
    exit /b 1
)

REM Use NSwag to generate client
nswag run openapi-generator-config.json /input:openapi-spec.json /output:"%OUTPUT_DIR%/api.client.ts" || (
    echo [ERROR] Failed to generate client
    echo [HINT] Ensure NSwag is installed: npm install -D @nswag/cli
    exit /b 1
)

echo.
echo ============================================================================
echo [OK] CLIENT GENERATION COMPLETE
echo ============================================================================
echo.
echo Generated client location: %OUTPUT_DIR%\api.client.ts
echo.
echo Next steps:
echo   1. Review generated file at: %OUTPUT_DIR%\api.client.ts
echo   2. Copy to your React project: src/api/generated/
echo   3. Import and use in your components:
echo      import { TodoApiClient } from '@/api/generated/api.client'
echo.
echo ============================================================================
echo.

endlocal
