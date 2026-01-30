#!/bin/bash
# FINAL COMPLETE REBUILD

set -e

echo "🔥 FINAL COMPLETE REBUILD"
echo "═══════════════════════════════════════════════════════════"
echo ""

cd ~/Desktop/gueth-ecommerce

# Clean
echo "1️⃣  Cleaning..."
rm -rf node_modules package-lock.json dist build .cache .shopify/hydrogen 2>/dev/null || true
echo "   ✅ Cleaned"
echo ""

# Install
echo "2️⃣  Installing dependencies..."
npm install --legacy-peer-deps
echo "   ✅ Installed"
echo ""

# Verify ALL critical files
echo "3️⃣  Verifying ALL critical files..."
critical_files=(
  "server.js"
  "env.d.ts"
  ".env"
  "app/routes.js"
  "app/entry.server.jsx"
  "app/entry.client.jsx"
  "app/root.jsx"
  "app/lib/context.js"
  "app/lib/session.js"
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
echo ""

if [ "$all_exist" = false ]; then
  echo "❌ Some files missing!"
  exit 1
fi

# Build
echo "4️⃣  Building..."
npm run build

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "✅ BUILD SUCCESSFUL!"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "🚀 Deploy: npx shopify hydrogen deploy --force"
echo ""
