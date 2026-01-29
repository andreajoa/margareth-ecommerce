import { json } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { ShopifyProvider, CartProvider } from '@shopify/hydrogen-react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { fetchShopify } from './lib/shopify.js';
import { MENU_QUERY } from './lib/queries.js';

export const meta = () => [{ title: 'BrinqueTEAndo' }];

export const links = () => [
  { rel: 'stylesheet', href: '/app.css' },
];

export async function loader() {
  // Fetch dynamic menus from Shopify (if env is configured)
  let header = null;
  let footer = null;
  try {
    header = (await fetchShopify(MENU_QUERY, { handle: 'main-menu' }))?.menu || null;
    footer = (await fetchShopify(MENU_QUERY, { handle: 'footer-menu' }))?.menu || null;
  } catch (_) {
    // Keep static navigation if fetching fails
  }

  return json({
    shop: {
      storeDomain: process.env.PUBLIC_STORE_DOMAIN || '',
      storefrontToken: process.env.PUBLIC_STOREFRONT_API_TOKEN || '',
      apiVersion: '2024-10',
      country: 'BR',
      language: 'PT_BR',
    },
    menus: { header, footer },
  });
}

export default function App() {
  const data = useLoaderData();
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <style>{`
          :root {
            --brand-blue-light: #8ECAE7;
            --brand-blue-dark: #21388D;
            --brand-blue: #3292D8;
            --brand-red: #CF111A;
            --brand-yellow: #DEC91F;
            --brand-gray-blue: #7D8FA4;
            --brand-beige: #EAD9B9;
          }
          body { margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif; background: #fff; color: #111; }
          a { color: var(--brand-blue); text-decoration: none; }
          .container { max-width: 1200px; margin: 0 auto; padding: 16px; }
          .btn-primary { background: var(--brand-blue-light); color: var(--brand-blue-dark); padding: 12px 20px; border-radius: 8px; font-weight: 700; border: none; cursor: pointer; }
          .btn-secondary { background: var(--brand-blue); color: #fff; padding: 12px 20px; border-radius: 8px; font-weight: 700; border: none; cursor: pointer; }
          header { padding: 12px 16px; border-bottom: 1px solid #eee; }
          header .brand { font-weight: 800; color: var(--brand-blue-dark); }
          footer { margin-top: 48px; padding: 24px 16px; background: #f8fafc; border-top: 1px solid #eee; }
        `}</style>
      </head>
      <body>
        <ShopifyProvider storefrontApiVersion={data.shop.apiVersion} storeDomain={`https://${data.shop.storeDomain}`} storefrontToken={data.shop.storefrontToken} country={data.shop.country} language={data.shop.language}>
          <CartProvider>
            <Header menu={data.menus.header} />
            <main className="container">
              <Outlet />
            </main>
            <Footer menu={data.menus.footer} />
          </CartProvider>
        </ShopifyProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
