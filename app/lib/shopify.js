const STORE_DOMAIN = process.env.PUBLIC_STORE_DOMAIN || 'uxst0j-qe.myshopify.com';
const STOREFRONT_API_TOKEN = process.env.PUBLIC_STOREFRONT_API_TOKEN || 'f4519cf3a3a10b4fccca0df4b0a464e1';
const API_VERSION = '2024-10';

export async function fetchShopify(query, variables = {}) {
  try {
    const response = await fetch(`https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_API_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      console.error('Shopify API error:', response.status, response.statusText);
      return null;
    }

    const json = await response.json();

    if (json.errors) {
      console.error('GraphQL errors:', json.errors);
      return null;
    }

    return json.data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}
