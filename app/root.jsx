import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router';
import {ShopifyProvider} from '@shopify/hydrogen-react';
import Header from './components/Header.jsx';

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
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --red: #CF111A;
            --yellow: #DEC91F;
            --bright-blue: #3292D8;
            --dark-blue: #21388D;
            --maroon: #7C3D36;
            --light-blue: #8ECAE7;
            --gray-blue: #7D8FA4;
            --beige: #EAD9B9;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            background: var(--light-blue);
            color: #1f2937;
          }
          a { color: inherit; text-decoration: none; }
          img { max-width: 100%; height: auto; }
          .container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }

          .max-w-7xl { max-width: 80rem; }
          .mx-auto { margin-left: auto; margin-right: auto; }
          .px-4 { padding-left: 1rem; padding-right: 1rem; }
          .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
          .px-8 { padding-left: 2rem; padding-right: 2rem; }
          .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
          .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
          .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
          .mb-6 { margin-bottom: 1.5rem; }
          .mb-8 { margin-bottom: 2rem; }
          .mb-12 { margin-bottom: 3rem; }
          .mb-16 { margin-bottom: 4rem; }
          .mt-2 { margin-top: .5rem; }
          .mt-4 { margin-top: 1rem; }

          .grid { display: grid; }
          .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
          .gap-2 { gap: .5rem; }
          .gap-3 { gap: .75rem; }
          .gap-4 { gap: 1rem; }
          .gap-6 { gap: 1.5rem; }
          .gap-8 { gap: 2rem; }
          .gap-12 { gap: 3rem; }

          .flex { display: flex; }
          .items-center { align-items: center; }
          .justify-between { justify-content: space-between; }
          .justify-center { justify-content: center; }
          .flex-wrap { flex-wrap: wrap; }

          .text-center { text-align: center; }
          .text-xs { font-size: .75rem; line-height: 1rem; }
          .text-sm { font-size: .875rem; line-height: 1.25rem; }
          .text-base { font-size: 1rem; line-height: 1.5rem; }
          .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
          .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
          .text-2xl { font-size: 1.5rem; line-height: 2rem; }
          .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
          .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
          .font-light { font-weight: 300; }
          .font-medium { font-weight: 500; }
          .font-semibold { font-weight: 600; }
          .font-bold { font-weight: 700; }
          .tracking-wide { letter-spacing: .05em; }
          .tracking-widest { letter-spacing: .2em; }

          .rounded-\\[10px\\] { border-radius: 10px; }
          .rounded-xl { border-radius: .75rem; }
          .rounded-2xl { border-radius: 1rem; }
          .rounded-3xl { border-radius: 1.5rem; }
          .rounded-full { border-radius: 9999px; }

          .relative { position: relative; }
          .absolute { position: absolute; }
          .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
          .w-full { width: 100%; }
          .h-full { height: 100%; }
          .w-5 { width: 1.25rem; }
          .h-5 { height: 1.25rem; }
          .w-11 { width: 2.75rem; }
          .h-11 { height: 2.75rem; }
          .object-cover { object-fit: cover; }
          .z-10 { z-index: 10; }
          .z-20 { z-index: 20; }
          .hidden { display: none; }

          .h-64 { height: 16rem; }

          @media (min-width: 640px) {
            .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .sm\\:text-base { font-size: 1rem; line-height: 1.5rem; }
            .sm\\:text-lg { font-size: 1.125rem; line-height: 1.75rem; }
            .sm\\:h-72 { height: 18rem; }
            .sm\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
          }

          @media (min-width: 768px) {
            .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .md\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
            .md\\:h-80 { height: 20rem; }
            .md\\:px-12 { padding-left: 3rem; padding-right: 3rem; }
          }

          @media (min-width: 1024px) {
            .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            .lg\\:grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
            .lg\\:flex { display: flex; }
            .lg\\:col-span-2 { grid-column: span 2 / span 2; }
          }
        `}} />
      </head>
      <body>
        <ShopifyProvider
          storeDomain={`https://${env.PUBLIC_STORE_DOMAIN}`}
          storefrontToken={env.PUBLIC_STOREFRONT_API_TOKEN}
          storefrontApiVersion={apiVersion}
          countryIsoCode="BR"
          languageIsoCode="PT_BR"
        >
          <Header menu={headerMenu} />
          <main style={{minHeight: '60vh'}}>
            <Outlet />
          </main>
          <Footer menu={footerMenu} />
        </ShopifyProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function Footer({menu}) {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, var(--bright-blue) 0%, var(--dark-blue) 100%)',
      padding: '32px 16px',
      marginTop: '48px',
      color: 'white',
    }}>
      <div className="container" style={{display: 'grid', gridTemplateColumns: '1fr', gap: '24px'}}>
        <div>
          <p style={{margin: 0, fontWeight: 600}}>Frete grátis para Praia Grande, Santos e São Vicente</p>
          <p style={{margin: '4px 0 0', opacity: 0.9}}>Atendemos todo o Litoral Paulista</p>
        </div>
        <nav style={{display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
          {(menu?.items || []).map((item) => (
            item.url?.startsWith('http') ? (
              <a key={item.id} href={item.url} rel="noopener" style={{color:'#fff'}}>{item.title}</a>
            ) : (
              <a key={item.id} href={item.url || '/'} style={{color:'#fff'}}>{item.title}</a>
            )
          ))}
        </nav>
        <p style={{margin: 0, opacity: 0.8}}>© {new Date().getFullYear()} BrinqueTEAndo. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export function ErrorBoundary() {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Erro</title>
      </head>
      <body>
        <div style={{padding: '40px', textAlign: 'center'}}>
          <h1>Ops! Algo deu errado</h1>
          <p>Por favor, tente novamente mais tarde.</p>
          <a href="/">Voltar para a home</a>
        </div>
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

const HEADER_MENU_QUERY = `#graphql
  fragment RootHeaderMenuItem on MenuItem {
    id
    title
    url
    type
    items { id title url type }
  }
  query RootHeaderMenu($headerMenuHandle: String!) {
    menu(handle: $headerMenuHandle) {
      id
      items { ...RootHeaderMenuItem }
    }
  }
`;

const FOOTER_MENU_QUERY = `#graphql
  fragment RootFooterMenuItem on MenuItem {
    id
    title
    url
    type
    items { id title url type }
  }
  query RootFooterMenu($footerMenuHandle: String!) {
    menu(handle: $footerMenuHandle) {
      id
      items { ...RootFooterMenuItem }
    }
  }
`;
