// @ts-check
import { defineConfig } from '@shopify/hydrogen/config';

/**
 * @param {import('@shopify/hydrogen/config').HydrogenConfigArgs} args
 */
export default defineConfig(() => {
  return {
    shopify: {
      storeDomain: 'uxst0j-qe.myshopify.com',
      storefrontToken: 'f4519cf3a3a10b4fccca0df4b0a464e1',
      storefrontApiVersion: '2024-10',
      country: 'BR',
      language: 'PT_BR',
    },
    logger: {
      mode: 'production',
    },
  };
});
