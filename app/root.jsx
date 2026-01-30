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
  const {storefront, env} = context;
  
  return {
    shop: {
      name: 'Brinqueteando',
      storeDomain: env.PUBLIC_STORE_DOMAIN,
      storefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      apiVersion: storefront.apiVersion,
    },
  };
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
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --brand-blue: #0046be;
            --brand-blue-light: #e6f0ff;
            --brand-blue-dark: #003399;
          }
          * { box-sizing: border-box; }
          body { 
            margin: 0; 
            font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
          }
          a { color: inherit; text-decoration: none; }
          img { max-width: 100%; height: auto; }
          .container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }
        `}} />
      </head>
      <body>
        <ShopifyProvider
          storeDomain={`https://${data.shop.storeDomain}`}
          storefrontToken={data.shop.storefrontToken}
          storefrontApiVersion={data.shop.apiVersion}
          countryIsoCode="BR"
          languageIsoCode="PT"
        >
          <Header shopName={data.shop.name} />
          <main style={{minHeight: '60vh'}}>
            <Outlet />
          </main>
          <Footer />
        </ShopifyProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function Header({shopName}) {
  return (
    <header style={{
      background: 'var(--brand-blue)',
      color: 'white',
      padding: '16px',
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <a href="/" style={{fontSize: '1.5rem', fontWeight: 'bold'}}>
          {shopName}
        </a>
        <nav style={{display: 'flex', gap: '24px'}}>
          <a href="/collections/all">Produtos</a>
          <a href="/cart">Carrinho</a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{
      background: '#f8fafc',
      padding: '32px 16px',
      marginTop: '48px',
      textAlign: 'center',
    }}>
      <p>© 2025 Brinqueteando. Todos os direitos reservados.</p>
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
