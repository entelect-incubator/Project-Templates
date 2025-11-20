#!/usr/bin/env pwsh
# Build and type check the application

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Building  React 19.2" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Type check
Write-Host "[1/3] Running TypeScript type check..." -ForegroundColor Yellow
npm run type-check
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Type check failed" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Type check passed" -ForegroundColor Green
Write-Host ""

# Build
Write-Host "[2/3] Building application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Build failed" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Build successful" -ForegroundColor Green
Write-Host ""

# Verify dist
Write-Host "[3/3] Verifying output..." -ForegroundColor Yellow
$distExists = Test-Path "dist"
if ($distExists) {
    $indexExists = Test-Path "dist/index.html"
    if ($indexExists) {
        Write-Host "[OK] dist/index.html exists" -ForegroundColor Green
        Write-Host ""
        Write-Host "============================================" -ForegroundColor Green
        Write-Host "  ✅ BUILD SUCCESSFUL!" -ForegroundColor Green
        Write-Host "============================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Ready for deployment!"
        Write-Host ""
        Write-Host "Next steps:"
        Write-Host "  1. npm run dev       - Start development server"
        Write-Host "  2. npm run preview   - Preview production build"
        Write-Host "  3. npm run deploy    - Deploy to production"
        Write-Host ""
    } else {
        Write-Host "[ERROR] dist/index.html not found" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "[ERROR] dist directory not created" -ForegroundColor Red
    exit 1
}
