export default {
  shopify: {
    defaultCountryCode: 'BR',
    defaultLanguageCode: 'PT',
    storeDomain: process.env.PUBLIC_STORE_DOMAIN || '',
    storefrontToken: process.env.PUBLIC_STOREFRONT_API_TOKEN || '',
    storefrontApiVersion: '2024-10',
  },
};
