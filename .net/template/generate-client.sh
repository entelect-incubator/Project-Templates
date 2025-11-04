#!/bin/bash
# API Client Generation Script for .NET Minimal API
# Generates TypeScript client from OpenAPI specification
# Usage: ./generate-client.sh [api-base-url]

set -e

API_URL="${1:-http://localhost:5000}"
OUTPUT_DIR="../frontend/React/template/src/api/generated"
SPEC_FILE="openapi-spec.json"

echo "============================================================================"
echo "  API CLIENT GENERATION - .NET to TypeScript"
echo "============================================================================"
echo ""
echo "[INFO] API URL: $API_URL"
echo "[INFO] Output Directory: $OUTPUT_DIR"
echo ""

# Check if API is running
echo "[INFO] Checking if API is running..."
if ! curl -s "$API_URL/health" > /dev/null 2>&1; then
    echo "[WARNING] API might not be running at $API_URL"
    echo "[INFO] Please ensure the .NET API is running: dotnet run"
    exit 1
fi
echo "[OK] API is running"
echo ""

# Download OpenAPI spec
echo "[INFO] Downloading OpenAPI specification..."
if ! curl -s "$API_URL/openapi/v1.json" -o "$SPEC_FILE"; then
    echo "[ERROR] Failed to download OpenAPI spec"
    exit 1
fi
echo "[OK] OpenAPI spec downloaded to $SPEC_FILE"
echo ""

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Generate TypeScript client using NSwag
echo "[INFO] Generating TypeScript client..."
# Note: You'll need to install NSwag CLI globally: npm install -g @nswag/cli
# Or use: nswag (if installed locally in project)

if command -v nswag &> /dev/null; then
    nswag run openapi-generator-config.nswag
else
    echo "[ERROR] NSwag CLI not found"
    echo "[HINT] Install NSwag: npm install -g @nswag/cli"
    exit 1
fi

echo "[OK] TypeScript client generated"
echo ""

echo "============================================================================"
echo "[OK] CLIENT GENERATION COMPLETE"
echo "============================================================================"
echo ""
echo "Generated client: $OUTPUT_DIR/client.ts"
echo ""
echo "Next steps:"
echo "  1. Review generated files in: $OUTPUT_DIR/"
echo "  2. Import in React components:"
echo "     import { TodosClient } from '@/api/generated/client'"
echo "  3. Use in data fetching hooks"
echo ""
echo "============================================================================"
