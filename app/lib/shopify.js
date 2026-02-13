// ✅ FIX: Removido process.env que causava CRASH no Oxygen
export async function fetchShopify(query, variables = {}, env) {
  // Fallback seguro se env não for passado
  const STORE_DOMAIN = env?.PUBLIC_STORE_DOMAIN || 'brinqueteando.myshopify.com';
  const STOREFRONT_API_TOKEN = env?.PUBLIC_STOREFRONT_API_TOKEN || 'f4519cf3a3a10b4fccca0df4b0a464e1';
  const API_VERSION = '2025-07';

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
