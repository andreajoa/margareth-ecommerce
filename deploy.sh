#!/bin/bash

# 🚀 Script de Deploy - BrinqueTEAndo (TEA & TDAH)
# Script para fazer deploy com autenticação Shopify

echo "🧩 Iniciando deploy do BrinqueTEAndo..."
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Passo 1: Verificar se está logado
echo -e "${YELLOW}📋 Verificando autenticação...${NC}"
if ! npx shopify auth status 2>/dev/null | grep -q "Logged in"; then
    echo -e "${RED}❌ Você não está autenticado no Shopify.${NC}"
    echo ""
    echo "🔑 Para fazer login, execute no terminal:"
    echo "   npx shopify login"
    echo ""
    echo "Ou acesse:"
    echo "   https://shopify.dev/docs/cli/getting-started#install-the-shopify-cli"
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ Autenticação verificada!${NC}"
echo ""

# Passo 2: Fazer build
echo -e "${YELLOW}🔨 Fazendo build do projeto...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build falhou!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build concluído com sucesso!${NC}"
echo ""

# Passo 3: Deploy
echo -e "${YELLOW}🚀 Fazendo deploy para Oxygen/Shopify...${NC}"
npx shopify hydrogen deploy

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✨ Deploy concluído com sucesso!${NC}"
    echo "🎉 Seu site TEA & TDAH está no ar!"
else
    echo ""
    echo -e "${RED}❌ Deploy falhou${NC}"
    echo ""
    echo "Possíveis soluções:"
    echo "1. Execute: npx shopify login --logout && npx shopify login"
    echo "2. Verifique sua conexão com a internet"
    echo "3. Confirme que você tem permissões de admin na loja"
    exit 1
fi
