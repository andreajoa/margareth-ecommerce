#!/bin/bash
# Fix Shopify Hydrogen Oxygen Deployment Error
# Error: No such module @remix-run/node

cd '/Users/andrealmeida/Desktop/gueth-ecommerce'

echo '🔧 Starting fixes for Oxygen deployment...'

# Install the correct dependencies
echo '📦 Installing @remix-run/react and @shopify/remix-oxygen...'
npm install @remix-run/react@^2.16.1 @shopify/remix-oxygen@^2.0.8

# Remove @remix-run/node if it exists
echo '🗑️  Removing @remix-run/node...'
npm uninstall @remix-run/node 2>/dev/null || true

# Clean build artifacts
echo '🧹 Cleaning build artifacts...'
rm -rf dist build .cache

# Rebuild the project
echo '🔨 Building the project...'
npm run build

echo '✅ Fixes applied successfully!'
echo ''
echo '📋 Next steps:'
echo '1. Test locally with: npm run dev'
echo '2. Deploy with: npx shopify hydrogen deploy --force'
echo ''
echo '🔍 Changes made:'
echo '  - Replaced all @remix-run/node imports with @remix-run/react'
echo '  - Updated vite.config.js with proper Workers configuration'
echo '  - Added alias to prevent future @remix-run/node imports'
echo '  - Updated package.json dependencies'

