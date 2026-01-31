import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router';
import {ShopifyProvider} from '@shopify/hydrogen-react';

export async function loader({context}) {
  const {env, storefront} = context;
  const layout = await storefront.query(LAYOUT_QUERY);

  return {
    shop: layout.shop,
    env: {
      PUBLIC_STORE_DOMAIN: env.PUBLIC_STORE_DOMAIN,
      PUBLIC_STOREFRONT_API_TOKEN: env.PUBLIC_STOREFRONT_API_TOKEN,
    },
    apiVersion: storefront.apiVersion || '2024-01',
  };
}

export default function App() {
  const {shop, env, apiVersion} = useLoaderData();

  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <ShopifyProvider
          storeDomain={`https://${env.PUBLIC_STORE_DOMAIN}`}
          storefrontAccessToken={env.PUBLIC_STOREFRONT_API_TOKEN}
          storefrontApiVersion={apiVersion}
          countryIsoCode="BR"
          languageIsoCode="PT"
        >
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </ShopifyProvider>
      </body>
    </html>
  );
}

const LAYOUT_QUERY = `#graphql
  query Layout {
    shop {
      id
      name
      description
    }
  }
`;