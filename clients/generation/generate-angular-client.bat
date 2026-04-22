@echo off
REM ============================================================================
REM Angular OpenAPI Client Generation Script for Windows (PowerShell)
REM ============================================================================
REM This script generates TypeScript Angular API client from OpenAPI specification
REM Optimized for Angular 21+ with Standalone Components and RxJS
REM
REM Usage: .\generate-angular-client.bat [base-url]
REM Examples:
REM   .\generate-angular-client.bat
REM   .\generate-angular-client.bat https://localhost:7160
REM ============================================================================

setlocal enabledelayedexpansion

echo.
echo ============================================================================
echo  ANGULAR OPENAPI CLIENT GENERATION
echo ============================================================================
echo.

REM Default values
set "BASE_URL=https://localhost:7160"
set "OUTPUT_DIR=..\generated\angular"
set "SPEC_FILE=..\generated\spec\swagger.json"
set "SCRIPT_DIR=%~dp0"

REM Parse command line arguments
if not "%1"=="" (
    set "BASE_URL=%1"
)

echo [INFO] Base URL: %BASE_URL%
echo [INFO] Output Directory: %OUTPUT_DIR%
echo [INFO] Spec File: %SPEC_FILE%
echo.

REM Step 1: Download OpenAPI spec
echo [STEP 1/3] Downloading OpenAPI Specification...
echo.
powershell -ExecutionPolicy Bypass -File "%SCRIPT_DIR%download-spec.ps1"
if errorlevel 1 (
    echo [ERROR] Failed to download OpenAPI specification
    exit /b 1
)
echo [SUCCESS] OpenAPI specification downloaded
echo.

REM Step 2: Check if spec file exists
if not exist "%SPEC_FILE%" (
    echo [ERROR] OpenAPI specification file not found: %SPEC_FILE%
    exit /b 1
)

REM Step 3: Generate Angular client using OpenAPI Generator
echo [STEP 2/3] Generating Angular TypeScript Client...
echo.

REM Clean output directory
if exist "%OUTPUT_DIR%" (
    echo [INFO] Cleaning output directory: %OUTPUT_DIR%
    rmdir /s /q "%OUTPUT_DIR%"
)

REM Create output directory
mkdir "%OUTPUT_DIR%" 2>nul

REM Generate client using OpenAPI Generator CLI
echo [INFO] Running OpenAPI Generator...
npx @openapitools/openapi-generator-cli generate ^
    -i "%SPEC_FILE%" ^
    -g typescript-angular ^
    -o "%OUTPUT_DIR%" ^
    --additional-properties=ngVersion=21,providedInSingleton=true,withInterfaces=true,useSingleRequestParameter=true

if errorlevel 1 (
    echo [ERROR] Client generation failed
    exit /b 1
)

echo [SUCCESS] Angular client generated successfully
echo.

REM Step 3: Install dependencies
echo [STEP 3/3] Installing dependencies...
echo.
cd "%OUTPUT_DIR%"
if exist "package.json" (
    call npm install
    if errorlevel 1 (
        echo [WARNING] Failed to install dependencies, but client generation succeeded
    ) else (
        echo [SUCCESS] Dependencies installed
    )
)

echo.
echo ============================================================================
echo  GENERATION COMPLETE
echo ============================================================================
echo.
echo The Angular client has been generated at: %OUTPUT_DIR%
echo.
echo Next steps:
echo   1. Copy the generated client to your Angular project
echo   2. Import services from the generated API
echo   3. Inject services into your components
echo.
echo Example usage:
echo   import { PizzaService } from './generated/angular';
echo   
echo   constructor(private pizzaService: PizzaService) {}
echo   
echo   loadPizzas() {
echo     this.pizzaService.getAllPizzas().subscribe(pizzas =^> {
echo       console.log(pizzas);
echo     });
echo   }
echo.
echo ============================================================================

endlocal
