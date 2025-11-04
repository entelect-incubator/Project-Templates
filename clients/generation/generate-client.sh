#!/bin/bash
################################################################################
# Client Generation Script for macOS/Linux
################################################################################
# This script generates TypeScript API client from OpenAPI specification
# Usage: ./generate-client.sh [base-url] [backend-project-path]
# Examples:
#   ./generate-client.sh
#   ./generate-client.sh http://localhost:5000
#   ./generate-client.sh http://api.example.com ../../backend/.NET/template
################################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Defaults
BASE_URL="${1:-http://localhost:5000}"
BACKEND_PROJECT="${2:-../../backend/.NET/template}"
OUTPUT_DIR="../generated"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Helper functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_ok() {
    echo -e "${GREEN}[OK]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Header
echo ""
echo "================================================================================"
echo " API CLIENT GENERATION"
echo "================================================================================"
echo ""

log_info "Base URL: $BASE_URL"
log_info "Backend Project: $BACKEND_PROJECT"
log_info "Output Directory: $OUTPUT_DIR"
echo ""

# Check if backend project exists
if [ ! -d "$SCRIPT_DIR/$BACKEND_PROJECT" ]; then
    log_error "Backend project not found at: $SCRIPT_DIR/$BACKEND_PROJECT"
    exit 1
fi

# Check if the API is running
log_info "Checking if API is running at $BASE_URL..."
if ! curl -s "$BASE_URL/health" > /dev/null 2>&1; then
    log_warning "API might not be running"
    log_info "Attempting to start the API..."
    
    cd "$SCRIPT_DIR/$BACKEND_PROJECT"
    if command -v dotnet &> /dev/null; then
        dotnet run &
        sleep 5
    else
        log_error ".NET SDK not found. Please install .NET 10.0 SDK"
        exit 1
    fi
    cd "$SCRIPT_DIR"
else
    log_ok "API is running"
fi

# Download OpenAPI spec
echo ""
log_info "Downloading OpenAPI specification from $BASE_URL/openapi/v1.json..."

if ! curl -s "$BASE_URL/openapi/v1.json" -o "openapi-spec.json"; then
    log_error "Failed to download OpenAPI specification"
    log_info "Ensure the API is running at $BASE_URL"
    exit 1
fi

log_ok "OpenAPI specification downloaded"

# Verify the spec file
if [ ! -f "openapi-spec.json" ]; then
    log_error "OpenAPI spec file not found after download"
    exit 1
fi

# Generate TypeScript client
echo ""
log_info "Generating TypeScript client..."

# Check if NSwag is available
if ! command -v nswag &> /dev/null; then
    log_error "NSwag not found. Install it with: npm install -D @nswag/cli"
    exit 1
fi

# Generate client
if ! nswag run openapi-generator-config.json \
    /input:openapi-spec.json \
    /output:"${OUTPUT_DIR}/api.client.ts"; then
    log_error "Failed to generate client"
    log_info "Ensure NSwag is properly installed"
    exit 1
fi

echo ""
echo "================================================================================"
log_ok "CLIENT GENERATION COMPLETE"
echo "================================================================================"
echo ""
echo "Generated client location: ${OUTPUT_DIR}/api.client.ts"
echo ""
echo "Next steps:"
echo "  1. Review generated file at: ${OUTPUT_DIR}/api.client.ts"
echo "  2. Copy to your React project: src/api/generated/"
echo "  3. Import and use in your components:"
echo "     import { TodoApiClient } from '@/api/generated/api.client'"
echo ""
echo "================================================================================"
echo ""

# Clean up
rm -f openapi-spec.json

log_ok "Complete!"
