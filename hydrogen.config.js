// @ts-check
import { defineConfig } from '@shopify/hydrogen/config';

/**
 * @param {import('@shopify/hydrogen/config').HydrogenConfigArgs} args
 */
export default defineConfig(() => {
  return {
    shopify: {
      storeDomain: 'brinqueteando.myshopify.com',
      storefrontToken: 'f4519cf3a3a10b4fccca0df4b0a464e1',
      storefrontApiVersion: '2025-07',
      country: 'BR',
      language: 'PT', // ✅ FIX: Código de idioma correto para Shopify
    },
    logger: {
      mode: 'production',
    },
  };
});
