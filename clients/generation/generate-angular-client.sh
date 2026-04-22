#!/bin/bash
# ============================================================================
# Angular OpenAPI Client Generation Script for macOS/Linux
# ============================================================================
# This script generates TypeScript Angular API client from OpenAPI specification
# Optimized for Angular 21+ with Standalone Components and RxJS
#
# Usage: ./generate-angular-client.sh [base-url]
# Examples:
#   ./generate-angular-client.sh
#   ./generate-angular-client.sh https://localhost:7160
# ============================================================================

set -e

echo ""
echo "============================================================================"
echo " ANGULAR OPENAPI CLIENT GENERATION"
echo "============================================================================"
echo ""

# Default values
BASE_URL="${1:-https://localhost:7160}"
OUTPUT_DIR="../generated/angular"
SPEC_FILE="../generated/spec/swagger.json"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "[INFO] Base URL: $BASE_URL"
echo "[INFO] Output Directory: $OUTPUT_DIR"
echo "[INFO] Spec File: $SPEC_FILE"
echo ""

# Step 1: Download OpenAPI spec
echo "[STEP 1/3] Downloading OpenAPI Specification..."
echo ""

# For macOS/Linux, we'll use curl instead of PowerShell
curl -k -o "$SPEC_FILE" "$BASE_URL/swagger/v1/swagger.json" || {
    echo "[ERROR] Failed to download OpenAPI specification"
    exit 1
}

echo "[SUCCESS] OpenAPI specification downloaded"
echo ""

# Step 2: Check if spec file exists
if [ ! -f "$SPEC_FILE" ]; then
    echo "[ERROR] OpenAPI specification file not found: $SPEC_FILE"
    exit 1
fi

# Step 3: Generate Angular client using OpenAPI Generator
echo "[STEP 2/3] Generating Angular TypeScript Client..."
echo ""

# Clean output directory
if [ -d "$OUTPUT_DIR" ]; then
    echo "[INFO] Cleaning output directory: $OUTPUT_DIR"
    rm -rf "$OUTPUT_DIR"
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Generate client using OpenAPI Generator CLI
echo "[INFO] Running OpenAPI Generator..."
npx @openapitools/openapi-generator-cli generate \
    -i "$SPEC_FILE" \
    -g typescript-angular \
    -o "$OUTPUT_DIR" \
    --additional-properties=ngVersion=21,providedInSingleton=true,withInterfaces=true,useSingleRequestParameter=true

echo "[SUCCESS] Angular client generated successfully"
echo ""

# Step 3: Install dependencies
echo "[STEP 3/3] Installing dependencies..."
echo ""
cd "$OUTPUT_DIR"
if [ -f "package.json" ]; then
    npm install || {
        echo "[WARNING] Failed to install dependencies, but client generation succeeded"
    }
    echo "[SUCCESS] Dependencies installed"
fi

echo ""
echo "============================================================================"
echo " GENERATION COMPLETE"
echo "============================================================================"
echo ""
echo "The Angular client has been generated at: $OUTPUT_DIR"
echo ""
echo "Next steps:"
echo "  1. Copy the generated client to your Angular project"
echo "  2. Import services from the generated API"
echo "  3. Inject services into your components"
echo ""
echo "Example usage:"
echo "  import { PizzaService } from './generated/angular';"
echo "  "
echo "  constructor(private pizzaService: PizzaService) {}"
echo "  "
echo "  loadPizzas() {"
echo "    this.pizzaService.getAllPizzas().subscribe(pizzas => {"
echo "      console.log(pizzas);"
echo "    });"
echo "  }"
echo ""
echo "============================================================================"
