# 🚀 Guia de Deploy - BrinqueTEAndo (TEA & TDAH)

## ❌ Problema Atual
Erro de autenticação (403 Unauthorized) ao tentar fazer deploy com `npx shopify hydrogen deploy`

## ✅ Solução

### Opção 1: Login via Browser (RECOMENDADO)

Execute este comando diretamente no seu terminal:

```bash
cd ~/Desktop/gueth-ecommerce
npx shopify login --logout
npx shopify login
```

Isso abrirá o navegador para você fazer login na conta:
- **Email**: plannerpremiumultra@gmail.com
- **Loja**: uxst0j-qe.myshopify.com (BrinqueTEAndo)

Depois do login, execute:
```bash
npx shopify hydrogen deploy
```

---

### Opção 2: Deploy Manual via Oxygen (Shopify Cloud)

1. **Acesse o Oxygen**: https://shopify.com/docs/oxygen
2. **Faça login** com plannerpremiumultra@gmail.com
3. **Conecte o repositório** Git (GitHub/GitLab)
4. **Configure o build**:
   - Build command: `npm run build`
   - Output directory: `dist`

---

### Opção 3: Deploy para Oxygen Worker Diretamente

```bash
# Criar build
npm run build

# Deploy usando Oxygen CLI
npx shopify hydrogen deploy --oxygen
```

---

### Opção 4: Deploy para Vercel/Netlify (Alternativa)

#### Para Vercel:
```bash
npm install -g vercel
vercel login
vercel --prod
```

#### Para Netlify:
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

---

## 🔧 Arquivos de Configuração Já Prontos

✅ `.env` - Variáveis de ambiente configuradas
✅ `vite.config.js` - Configuração do Hydrogen
✅ `package.json` - Scripts configurados
✅ `.shopify/project.json` - Projeto conectado à loja

---

## 📊 Checklist Pré-Deploy

- [ ] Código commitado ao Git
- [ ] Branch correta (main)
- [ ] Variáveis de ambiente configuradas
- [ ] Build testado localmente: `npm run build`
- [ ] Preview testado: `npm run preview`

---

## 🎨 Tema TEA & TDAH Implementado

- ✅ Paleta de cores do autismo (#87CEEB, #4A90E2, #FF6B6B, #FFD93D, #6BCF7F)
- ✅ Mega menu estratégico para TEA/TDAH
- ✅ Páginas em Português Brasileiro
- ✅ Frete grátis para São Vicente, Santos e Praia Grande
- ✅ Design kid-friendly e profissional
- ✅ Selos de confiança e benefícios

---

## 🆘 Problemas Comuns

### Erro: "Unauthorized Access"
**Solução**: Faça logout e login novamente:
```bash
npx shopify auth logout
npx shopify login
```

### Erro: "Storefront not found"
**Solução**: Verifique o arquivo `.shopify/project.json` e confirme:
- shop: uxst0j-qe.myshopify.com
- storefront id: gid://shopify/HydrogenStorefront/1000088674

### Erro: "Build failed"
**Solução**: Limpe o cache e rebuild:
```bash
rm -rf node_modules dist .cache
npm install
npm run build
```

---

## 📞 Suporte

Se precisar de ajuda adicional, execute:
```bash
npx shopify hydrogen --help
```

Ou acesse: https://shopify.dev/docs/hydrogen

---

**Feito com 💙 para Neurodiversidade**
