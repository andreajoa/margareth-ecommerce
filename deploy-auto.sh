#!/bin/bash
# Deploy Script Automático - brinqueTEAndo
# Executado em: Tue Feb  3 00:25:45 -03 2026

echo "🚀 Iniciando deploy no Shopify Oxygen..."
echo ""

# Configura Node via NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# Usa Node 20.x
nvm use 20 2>/dev/null || export PATH="$HOME/.nvm/versions/node/v20.19.6/bin:$PATH"

echo "📦 Versões:"
node --version
npm --version
echo ""

# Git status
echo "📝 Git Status:"
git status --short
echo ""

# Deploy
echo "🌐 Fazendo deploy..."
npx shopify hydrogen deploy

echo ""
echo "✅ Deploy concluído!"

