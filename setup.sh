#!/bin/bash

echo '🚀 BrinqueTEAndo Setup Script'
echo '================================'
echo ''

# Check if .env exists
if [ ! -f .env ]; then
    echo '⚠️  Creating .env file from template...'
    cp .env.example .env
    echo '✅ .env created! Please edit with your Shopify credentials.'
    echo ''
fi

# Install dependencies
echo '📦 Installing dependencies...'
npm install

echo ''
echo '✅ Setup complete!'
echo ''
echo 'Next steps:'
echo '1. Edit .env with your Shopify API credentials'
echo '2. Create menus in Shopify Admin (main-menu, footer-menu)'
echo '3. Run: npm run dev'
echo '4. Open: http://localhost:3000'
echo ''
echo 'For deployment:'
echo '  npm run build'
echo '  npx shopify hydrogen deploy'
echo ''
