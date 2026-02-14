const TOKEN = 'f4519cf3a3a10b4fccca0df4b0a464e1';
const DOMAIN = 'brinqueteando.myshopify.com';
const API = '2025-07';

async function run() {
  // Step 1: Get a variant ID
  const prodRes = await fetch(`https://${DOMAIN}/api/${API}/graphql.json`, {
    method: 'POST',
    headers: {'Content-Type':'application/json','X-Shopify-Storefront-Access-Token':TOKEN},
    body: JSON.stringify({query: '{ products(first:1) { nodes { title variants(first:1) { nodes { id availableForSale } } } } }'})
  });
  const prodData = await prodRes.json();
  const variant = prodData.data?.products?.nodes?.[0]?.variants?.nodes?.[0];
  console.log('Product:', prodData.data?.products?.nodes?.[0]?.title);
  console.log('Variant:', variant?.id, 'Available:', variant?.availableForSale);

  if (!variant?.id) { console.log('NO VARIANT FOUND'); return; }

  // Step 2: Create cart with that variant + our fragment
  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id checkoutUrl totalQuantity
          lines(first: 10) {
            nodes {
              id quantity
              cost { totalAmount { amount currencyCode } }
              merchandise {
                ... on ProductVariant {
                  id title
                  image { id url altText width height }
                  price { amount currencyCode }
                  product { id title handle }
                  selectedOptions { name value }
                }
              }
            }
          }
          cost {
            subtotalAmount { amount currencyCode }
            totalAmount { amount currencyCode }
          }
        }
        userErrors { field message code }
      }
    }
  `;

  const cartRes = await fetch(`https://${DOMAIN}/api/${API}/graphql.json`, {
    method: 'POST',
    headers: {'Content-Type':'application/json','X-Shopify-Storefront-Access-Token':TOKEN},
    body: JSON.stringify({
      query: mutation,
      variables: { input: { lines: [{ merchandiseId: variant.id, quantity: 1 }] } }
    })
  });
  const cartData = await cartRes.json();
  console.log('\n=== CART CREATE RESULT ===');
  console.log(JSON.stringify(cartData, null, 2));

  // Step 3: Test if errors field exists
  if (cartData.errors) {
    console.log('\n=== GRAPHQL ERRORS ===');
    console.log(JSON.stringify(cartData.errors, null, 2));
  }
  if (cartData.data?.cartCreate?.userErrors?.length) {
    console.log('\n=== USER ERRORS ===');
    console.log(JSON.stringify(cartData.data.cartCreate.userErrors, null, 2));
  }
}

run().catch(console.error);
