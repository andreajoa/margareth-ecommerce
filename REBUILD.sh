#!/bin/bash
# Complete Rebuild Script

set -e

echo "🔥 COMPLETE REBUILD FROM SCRATCH"
echo "═══════════════════════════════════════════════════════════"
echo ""

cd ~/Desktop/gueth-ecommerce

# Step 1: Clean everything
echo "1️⃣  Cleaning all build artifacts..."
rm -rf node_modules package-lock.json dist build .cache .shopify/hydrogen 2>/dev/null || true
echo "   ✅ Cleaned"
echo ""

# Step 2: Install dependencies
echo "2️⃣  Installing dependencies (this may take a minute)..."
npm install --legacy-peer-deps
echo "   ✅ Dependencies installed"
echo ""

# Step 3: Verify critical files
echo "3️⃣  Verifying critical files exist..."
critical_files=(
  "app/routes.js"
  "app/entry.server.jsx"
  "app/entry.client.jsx"
  "app/root.jsx"
  "vite.config.js"
  "react-router.config.js"
)

all_exist=true
for file in "${critical_files[@]}"; do
  if [ -f "$file" ]; then
    echo "   ✅ $file"
  else
    echo "   ❌ MISSING: $file"
    all_exist=false
  fi
done

if [ "$all_exist" = false ]; then
  echo ""
  echo "❌ Some critical files are missing!"
  exit 1
fi
echo ""

# Step 4: Build
echo "4️⃣  Building project..."
npm run build

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "✅ BUILD SUCCESSFUL!"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "🚀 Ready to deploy:"
echo "   npx shopify hydrogen deploy --force"
echo ""
