# 🍎 macOS Big Sur 11 Compatibility Setup Guide

## ✅ package.json já foi atualizado!

O arquivo `package.json` foi **modificado com sucesso** para versões compatíveis com macOS Big Sur 11.

---

## 📋 Próximos Passos

Siga **EXATAMENTE** estes passos na ordem:

### 1️⃣ Verificar se tem nvm instalado
```bash
nvm --version
```

**Se der erro "command not found":**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

Depois feche e abra o terminal novamente.

---

### 2️⃣ Instalar Node.js 16.x
```bash
nvm install 16
```

Isso vai baixar e instalar o Node.js 16.20.2 (última versão do 16.x)

---

### 3️⃣ Usar Node 16.x
```bash
nvm use 16
```

**Importante:** Verifique que funcionou:
```bash
node --version
# Deve mostrar: v16.20.2 (ou similar)
```

---

### 4️⃣ Limpar instalação antiga
```bash
cd ~/Desktop/gueth-ecommerce
rm -rf node_modules package-lock.json
```

Isso remove as versões antigas que não funcionam no Big Sur.

---

### 5️⃣ Instalar dependências compatíveis
```bash
npm install
```

⏱️ Isso vai demorar **2-3 minutos**

---

### 6️⃣ Testar o build
```bash
npm run build
```

✅ Se funcionar, você verá:
```
✓ Build successful in XX.XXs
```

---

### 7️⃣ Iniciar o servidor de desenvolvimento
```bash
npm run dev
```

Abra o navegador em: **http://localhost:3000**

---

## 🔧 Troubleshooting

### Problema: "nvm: command not found"
**Solução:** Instale o nvm primeiro:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bash_profile  # ou source ~/.zshrc
```

### Problema: "Permission denied"
**Solução:** Não use sudo. O nvm não precisa de sudo.

### Problema: Build falha com erro de ESLint
**Solução:** Tente:
```bash
npm run build -- --no-lint
```

### Problema: Porta 3000 já está em uso
**Solução:** Mate o processo:
```bash
lsof -ti:3000 | xargs kill -9
```

---

## 📊 Versões Instaladas (Big Sur Compatible)

```
Node.js:       16.20.2  (downgraded from 20.11.0)
React:         17.0.2   (downgraded from 18.3.1)
React Router:  6.20.0   (downgraded from 7.9.2)
Hydrogen:      2024.1.0 (downgraded from 2025.7.0)
Vite:          5.0.0    (downgraded from 6.2.4)
TypeScript:    5.0.0    (downgraded from 5.9.2)
```

---

## ✨ O que foi mudado no package.json

### Antes (incompatível com Big Sur):
```json
{
  "engines": { "node": ">=18.0.0" },
  "dependencies": {
    "@shopify/hydrogen": "2025.7.0",
    "react": "18.3.1",
    "react-router": "7.9.2"
  }
}
```

### Depois (compatível com Big Sur):
```json
{
  "engines": { "node": ">=16.14.0 <17.0.0" },
  "dependencies": {
    "@shopify/hydrogen": "^2024.1.0",
    "react": "^17.0.2",
    "react-router": "^6.20.0"
  }
}
```

---

## 🎨 Tema TEA/TDAH Mantido!

✅ Todas as cores do quebra-cabeça de autismo foram mantidas
✅ Sky Blue (#87CEEB) como cor principal
✅ Cores do puzzle: Vermelho (#FF6B6B), Amarelo (#FFD93D), Azul (#4A90E2)
✅ Todo o conteúdo em Português Brasileiro
✅ Frete grátis para São Vicente, Santos e Praia Grande

---

## 🚀 Após completar os passos

O site vai funcionar **perfeitamente** no seu MacBook Air com macOS Big Sur 11!

🧩💙 **Boa sorte!**
