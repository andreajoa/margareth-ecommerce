# 🎯 COMPLETE MIGRATION GUIDE: Remix → React Router 7

## 🚨 Original Problem

**Error:** `Uncaught Error: No such module "@remix-run/node". imported from "worker.mjs"`

**Root Cause:** Using outdated **Remix** instead of **React Router 7** + modern Hydrogen stack

## 📊 Comparison: What Works vs What Didn't

### ✅ vastara-production (WORKING)
```json
{
  "@shopify/hydrogen": "^2025.7.0",
  "react-router": "^7.9.2",
  "@react-router/dev": "^7.9.2",
  "@shopify/mini-oxygen": "^4.0.0"
}
```
- Uses `react-router` (modern)
- Entry: `HydratedRouter` from `react-router/dom`
- Build: `shopify hydrogen build --codegen`

### ❌ brinqueteando (BROKEN - Before Fix)
```json
{
  "@remix-run/react": "^2.16.1",
  "@remix-run/dev": "^2.17.0",
  "@shopify/hydrogen": "^2024.10.0"
}
```
- Used `@remix-run/react` (deprecated for Hydrogen)
- Entry: `RemixBrowser` from `@remix-run/react`
- Build: `remix vite:build`

## 🔧 Complete Changes Made

### 1. package.json
**REMOVED:**
- `@remix-run/react`
- `@remix-run/dev`
- `@remix-run/server-runtime`
- `@shopify/remix-oxygen`

**CHANGED:**
```json
{
  "scripts": {
    "dev": "shopify hydrogen dev",
    "build": "shopify hydrogen build --codegen",
    "preview": "shopify hydrogen preview"
  }
}
```

### 2. vite.config.js
**BEFORE:**
```javascript
import {vitePlugin as remix} from '@remix-run/dev';

export default defineConfig({
  plugins: [
    hydrogen(),
    remix({ /* ... */ }),
  ],
});
```

**AFTER:**
```javascript
import {vitePlugin as remix} from '@react-router/dev';
import {oxygen} from '@shopify/mini-oxygen/vite';

export default defineConfig({
  plugins: [
    hydrogen(),
    oxygen(),  // Added Mini Oxygen
    remix({
      presets: [hydrogen.preset()],
      future: {
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
  ],
});
```

### 3. app/entry.server.jsx
**BEFORE:**
```javascript
import {RemixServer} from '@remix-run/react';
```

**AFTER:**
```javascript
import {RemixServer} from 'react-router';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

// Added CSP support
const {nonce, header, NonceProvider} = createContentSecurityPolicy();
```

### 4. app/entry.client.jsx
**BEFORE:**
```javascript
import {RemixBrowser} from '@remix-run/react';

<RemixBrowser />
```

**AFTER:**
```javascript
import {HydratedRouter} from 'react-router/dom';

<HydratedRouter />
```

### 5. All Route Files
**Changed in:**
- `app/root.jsx`
- `app/routes/index.jsx`
- `app/routes/collections.$handle.jsx`
- `app/routes/products.$handle.jsx`

**BEFORE:**
```javascript
import {json, useLoaderData, Link} from '@remix-run/react';
```

**AFTER:**
```javascript
import {json, useLoaderData, Link} from 'react-router';
```

## 🚀 Migration Steps

### Option A: Run Automated Script (RECOMMENDED)
```bash
cd ~/Desktop/gueth-ecommerce
./migrate-to-react-router.sh
```

### Option B: Manual Steps
```bash
cd ~/Desktop/gueth-ecommerce

# 1. Clean everything
rm -rf node_modules package-lock.json dist build .cache

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Build
npm run build

# 4. Test locally
npm run dev

# 5. Deploy
npx shopify hydrogen deploy --force
```

## 📋 Pre-Deployment Checklist

- [ ] No `@remix-run` imports in codebase
- [ ] `package.json` uses `react-router` instead of `@remix-run/react`
- [ ] `vite.config.js` imports from `@react-router/dev`
- [ ] `entry.server.jsx` uses `react-router`
- [ ] `entry.client.jsx` uses `HydratedRouter`
- [ ] All route files updated
- [ ] `npm run build` succeeds
- [ ] `npm run dev` works locally

## 🔍 Verification Commands

```bash
# Check for any remaining Remix imports
grep -r '@remix-run' app/
# Should return: (nothing)

# Verify package.json
cat package.json | grep -E 'remix|react-router'

# Test build
npm run build

# Check routes
npx shopify hydrogen check routes
```

## 🎯 Why This Happened

### Historical Context:
1. **2023:** Shopify Hydrogen used Remix
2. **2024:** Remix merged into React Router 7
3. **2025:** Shopify updated to React Router 7
4. **Your project:** Was stuck on old Remix version

### The Fix:
Switch from **Remix-based Hydrogen** → **React Router 7-based Hydrogen**

## 🛡️ Prevention Measures

### Always use these versions:
```json
{
  "@shopify/hydrogen": "^2025.7.0",
  "react-router": "^7.9.2",
  "@react-router/dev": "^7.9.2"
}
```

### Never install:
- `@remix-run/react`
- `@remix-run/dev`
- `@remix-run/node`
- `@shopify/remix-oxygen` (old package)

### Check official template:
```bash
npm create @shopify/hydrogen@latest
```

## 🔗 Oxygen Deployment

### First Time Setup:
```bash
# Link to your Shopify store
npx shopify hydrogen link

# Deploy
npx shopify hydrogen deploy --force
```

### Subsequent Deploys:
```bash
npm run build
npx shopify hydrogen deploy --force
```

## 🆘 Troubleshooting

### Error: "No such module @remix-run/node"
- ✅ Fixed by this migration
- Verify: `grep -r '@remix-run' app/` returns nothing

### Error: "Cannot find module '@react-router/dev'"
```bash
npm install --legacy-peer-deps
```

### Build warnings about future flags
- ✅ Already configured in `vite.config.js`
- These are informational, not errors

### GitHub Actions failing
Check `.github/workflows/*.yml` uses:
```yaml
- name: Build
  run: npm run build

- name: Deploy
  run: npx shopify hydrogen deploy --force
```

## 📚 Resources

- [Shopify Hydrogen Docs](https://shopify.dev/docs/custom-storefronts/hydrogen)
- [React Router 7 Docs](https://reactrouter.com/en/main)
- [Migration Guide](https://remix.run/docs/en/main/guides/react-router-v7)

## ✨ Summary

**Problem:** Mixing Remix and React Router 7
**Solution:** Complete migration to React Router 7
**Result:** Match working vastara-production setup

Your project now uses the **exact same stack** as vastara-production! 🎉

