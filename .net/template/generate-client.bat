@echo off
REM API Client Generation Script for .NET Minimal API (Windows)
REM Generates TypeScript client from OpenAPI specification
REM Usage: generate-client.bat [api-base-url]

setlocal enabledelayedexpansion

set "API_URL=http://localhost:5000"
set "OUTPUT_DIR=..\frontend\React\template\src\api\generated"
set "SPEC_FILE=openapi-spec.json"

if not "%1"=="" set "API_URL=%1"

echo.
echo ============================================================================
echo   API CLIENT GENERATION - .NET to TypeScript
echo ============================================================================
echo.
echo [INFO] API URL: %API_URL%
echo [INFO] Output Directory: %OUTPUT_DIR%
echo.

REM Check if API is running
echo [INFO] Checking if API is running...
powershell -NoProfile -Command "try { $null = Invoke-WebRequest -Uri '%API_URL%/health' -ErrorAction Stop; Write-Host '[OK] API is running' } catch { Write-Host '[ERROR] API not responding'; exit 1 }"

if errorlevel 1 (
    echo [ERROR] API is not running at %API_URL%
    echo [INFO] Please start the .NET API: dotnet run
    exit /b 1
)

REM Download OpenAPI spec
echo.
echo [INFO] Downloading OpenAPI specification from %API_URL%/openapi/v1.json...
powershell -NoProfile -Command "Invoke-WebRequest -Uri '%API_URL%/openapi/v1.json' -OutFile '%SPEC_FILE%'" || (
    echo [ERROR] Failed to download OpenAPI spec
    exit /b 1
)
echo [OK] OpenAPI spec downloaded

REM Create output directory
if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

REM Generate TypeScript client using NSwag
echo.
echo [INFO] Generating TypeScript client...

if exist "openapi-generator-config.nswag" (
    REM Use NSwag to generate
    nswag run openapi-generator-config.nswag /input:%SPEC_FILE% /output:%OUTPUT_DIR%\client.ts || (
        echo [ERROR] Failed to generate client with NSwag
        exit /b 1
    )
) else (
    echo [ERROR] openapi-generator-config.nswag not found
    exit /b 1
)

echo.
echo ============================================================================
echo [OK] CLIENT GENERATION COMPLETE
echo ============================================================================
echo.
echo Generated client: %OUTPUT_DIR%\client.ts
echo.
echo Next steps:
echo   1. Review generated files in: %OUTPUT_DIR%\
echo   2. Import in React components:
echo      import { TodosClient } from '@/api/generated/client'
echo   3. Use in data fetching hooks
echo.
echo ============================================================================
echo.

endlocal
