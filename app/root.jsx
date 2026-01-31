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
  const {menu: headerMenu} = await storefront.query(HEADER_MENU_QUERY, {
    variables: {headerMenuHandle: 'main-menu'},
  });
  const {menu: footerMenu} = await storefront.query(FOOTER_MENU_QUERY, {
    variables: {footerMenuHandle: 'footer'},
  });

  return {
    shop: layout.shop,
    headerMenu,
    footerMenu,
    env: {
      PUBLIC_STORE_DOMAIN: env.PUBLIC_STORE_DOMAIN,
      PUBLIC_STOREFRONT_API_TOKEN: env.PUBLIC_STOREFRONT_API_TOKEN,
    },
    apiVersion: storefront.apiVersion || '2024-01',
  };
}

export default function App() {
  const {shop, headerMenu, footerMenu, env, apiVersion} = useLoaderData();

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
          storeDomain={env.PUBLIC_STORE_DOMAIN}
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
  query layout {
    shop {
      name
      description
    }
  }
`;

const HEADER_MENU_QUERY = `#graphql
  fragment MenuItem on MenuItem {
    id
    title
    url
    type
    items {
      id
      title
      url
      type
    }
  }
  query HeaderMenu($headerMenuHandle: String!) {
    menu(handle: $headerMenuHandle) {
      id
      items {
        ...MenuItem
      }
    }
  }
`;

const FOOTER_MENU_QUERY = `#graphql
  fragment MenuItem on MenuItem {
    id
    title
    url
    type
    items {
      id
      title
      url
      type
    }
  }
  query FooterMenu($footerMenuHandle: String!) {
    menu(handle: $footerMenuHandle) {
      id
      items {
        ...MenuItem
      }
    }
  }
`;
