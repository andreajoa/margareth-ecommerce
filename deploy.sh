#!/bin/bash
set -e
cd /Users/andrealmeida/Desktop/gueth-ecommerce

echo '🧹 Cleaning...'
rm -rf node_modules package-lock.json .cache dist

echo '📦 Installing with legacy peer deps...'
npm install --legacy-peer-deps

echo '📝 Committing...'
git add -A
git commit -m 'Fix React 18 and deploy TEA & TDAH website' || echo 'Nothing to commit'

echo '🚀 Deploying...'
npx shopify hydrogen deploy --force

echo '✅ DEPLOYED!'
