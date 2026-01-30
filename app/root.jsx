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
