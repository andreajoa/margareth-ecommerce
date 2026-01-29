import { createStorefrontClient } from '@shopify/hydrogen-react';

// Environment variables (from Oxygen/Hydrogen)
const STORE_DOMAIN = process.env.PUBLIC_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN || '';
const PRIVATE_STOREFRONT_TOKEN =
  process.env.PRIVATE_STOREFRONT_API_TOKEN ||
  process.env.SHOPIFY_STOREFRONT_API_TOKEN ||
  '';

// Optional: public token if you later need client-side queries
const PUBLIC_STOREFRONT_TOKEN = process.env.PUBLIC_STOREFRONT_API_TOKEN || undefined;

// Create Shopify Storefront API client (server-side uses private token)
export const shopifyClient = createStorefrontClient({
  storeDomain: `https://${STORE_DOMAIN}`,
  storefrontApiVersion: '2024-10',
  privateStorefrontToken: PRIVATE_STOREFRONT_TOKEN,
  publicStorefrontToken: PUBLIC_STOREFRONT_TOKEN,
});

// Helper: Fetch Shopify data
export async function fetchShopify(query, variables = {}) {
  try {
    const { data, errors } = await shopifyClient.query(query, { variables });
    if (errors) {
      console.error('Shopify GraphQL errors:', errors);
      throw new Error(errors[0]?.message || 'Shopify query failed');
    }
    return data;
  } catch (error) {
    console.error('Shopify fetch error:', error);
    throw error;
  }
}
