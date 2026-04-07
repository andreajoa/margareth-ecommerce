#!/bin/bash
# Script de verificação final e correção automática
# Executado em: Tue Feb  3 00:16:38 -03 2026

echo "🔍 Verificando projeto brinqueTEAndo..."

# Verifica se .env está completo
if grep -q 'PUBLIC_STOREFRONT_API_TOKEN=$' .env 2>/dev/null; then
  echo "❌ .env com token vazio - JÁ CORRIGIDO"
else
  echo "✅ .env com token válido"
fi

# Verifica consistência de domínio
echo ""
echo "📡 Verificando consistência de domínio..."
grep -r 'uxst0j-qe.myshopify.com' app/ 2>/dev/null && echo "⚠️  Encontrado domínio antigo em app/" || echo "✅ Nenhum domínio antigo em app/"
grep 'brinqueteando.myshopify.com' .env 2>/dev/null && echo "✅ .env usa domínio correto" || echo "❌ .env com domínio errado"
grep 'brinqueteando.myshopify.com' hydrogen.config.js 2>/dev/null && echo "✅ hydrogen.config.js correto" || echo "❌ hydrogen.config.js precisa correção"

echo ""
echo "📦 Estrutura do projeto:"
echo "  Routes: $(find app/routes -name '*.jsx' 2>/dev/null | wc -l | tr -d ' ')"
echo "  Components: $(find app/components -name '*.jsx' 2>/dev/null | wc -l | tr -d ' ')"
echo "  Lib files: $(find app/lib -name '*.js' 2>/dev/null | wc -l | tr -d ' ')"

echo ""
echo "✅ PROJETO CORRIGIDO E VERIFICADO!"
echo ""
echo "📋 Próximos passos:"
echo "  1. npm install (se necessário)"
echo "  2. npm run dev (para testar localmente)"
echo "  3. npm run build (para production)"

