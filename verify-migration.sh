#!/bin/bash
# Verification Script - Check if migration was successful

echo '🔍 MIGRATION VERIFICATION'
echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
echo ''

cd "/Users/andrealmeida/Desktop/gueth-ecommerce"

# Check 1: No Remix imports
echo '1️⃣  Checking for Remix imports...'
if grep -r '@remix-run' app/ 2>/dev/null; then
    echo '❌ FAIL: Found @remix-run imports'
    exit 1
else
    echo '✅ PASS: No Remix imports'
fi
echo ''

# Check 2: Package.json has React Router
echo '2️⃣  Checking package.json...'
if grep -q '"react-router"' package.json; then
    echo '✅ PASS: React Router found'
else
    echo '❌ FAIL: React Router not in package.json'
    exit 1
fi
echo ''

# Check 3: Vite config uses @react-router/dev
echo '3️⃣  Checking vite.config.js...'
if grep -q '@react-router/dev' vite.config.js; then
    echo '✅ PASS: Using @react-router/dev'
else
    echo '❌ FAIL: Not using @react-router/dev'
    exit 1
fi
echo ''

# Check 4: Entry server uses react-router
echo '4️⃣  Checking entry.server.jsx...'
if grep -q "from 'react-router'" app/entry.server.jsx; then
    echo '✅ PASS: Entry server updated'
else
    echo '❌ FAIL: Entry server not updated'
    exit 1
fi
echo ''

# Check 5: Entry client uses HydratedRouter
echo '5️⃣  Checking entry.client.jsx...'
if grep -q 'HydratedRouter' app/entry.client.jsx; then
    echo '✅ PASS: Entry client updated'
else
    echo '❌ FAIL: Entry client not updated'
    exit 1
fi
echo ''

# Check 6: Node modules exist
echo '6️⃣  Checking dependencies...'
if [ -d "node_modules" ]; then
    echo '✅ PASS: Dependencies installed'
else
    echo '⚠️  WARNING: Run npm install'
fi
echo ''

echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
echo '✅ ALL CHECKS PASSED!'
echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
echo ''
echo '🎯 Ready for deployment!'
echo ''
echo 'Next steps:'
echo '  1. Test: npm run dev'
echo '  2. Build: npm run build'
echo '  3. Deploy: npx shopify hydrogen deploy --force'

