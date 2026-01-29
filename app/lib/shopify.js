import { createStorefrontClient } from '@shopify/hydrogen-react';

// Environment variables (will be loaded from .env)
const STORE_DOMAIN = process.env.PUBLIC_STORE_DOMAIN || '';
const STOREFRONT_ACCESS_TOKEN = process.env.PUBLIC_STOREFRONT_API_TOKEN || '';

// Create Shopify Storefront API client
export const shopifyClient = createStorefrontClient({
  storeDomain: `https://${STORE_DOMAIN}`,
  storefrontApiVersion: '2024-10',
  privateStorefrontToken: STOREFRONT_ACCESS_TOKEN,
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
