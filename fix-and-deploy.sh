#!/bin/bash
echo '🔧 Fixing dependencies...'
cd /Users/andrealmeida/Desktop/gueth-ecommerce

echo '📦 Installing dependencies...'
npm install

echo '📝 Committing changes...'
git add package.json package-lock.json
git commit -m 'Fix dependencies for deployment'

echo '🚀 Deploying to Shopify...'
npx shopify hydrogen deploy

echo '✅ Done!'
