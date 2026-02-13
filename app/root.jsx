import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from 'react-router';
import {ShopifyProvider} from '@shopify/hydrogen-react';
import {AsideProvider, Aside} from '~/components/Aside';
import styles from './styles/app.css?url';

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    {rel: 'preconnect', href: 'https://cdn.shopify.com'},
    {rel: 'preconnect', href: 'https://shop.app'},
  ];
};

export async function loader({context}) {
  const {env, cart} = context;
  return {
    env: {
      PUBLIC_STORE_DOMAIN:
        env?.PUBLIC_STORE_DOMAIN || 'brinqueteando.myshopify.com',
      PUBLIC_STOREFRONT_API_TOKEN:
        env?.PUBLIC_STOREFRONT_API_TOKEN ||
        'f4519cf3a3a10b4fccca0df4b0a464e1',
    },
    apiVersion: '2024-10',
    // Deferred — streams in without blocking page render
    cart: cart.get(),
  };
}

export default function App() {
  const {env, apiVersion, cart} = useLoaderData();

  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AsideProvider>
          <ShopifyProvider
            storeDomain={env.PUBLIC_STORE_DOMAIN}
            storefrontToken={env.PUBLIC_STOREFRONT_API_TOKEN}
            storefrontApiVersion={apiVersion}
            countryIsoCode="BR"
            languageIsoCode="PT"
          >
            <Aside cart={cart} />
            <Outlet />
          </ShopifyProvider>
        </AsideProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Erro desconhecido';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.statusText;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div
          style={{
            padding: '2rem',
            textAlign: 'center',
            fontFamily: 'sans-serif',
          }}
        >
          <h1 style={{fontSize: '3rem', marginBottom: '1rem'}}>😕</h1>
          <h2 style={{color: '#3A8ECD'}}>
            Algo deu errado ({errorStatus})
          </h2>
          <p>{errorMessage}</p>
          <br />
          <a
            href="/"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              background: '#3A8ECD',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
            }}
          >
            Voltar para a Loja
          </a>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
