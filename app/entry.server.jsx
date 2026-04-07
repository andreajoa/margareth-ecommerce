import {ServerRouter} from 'react-router';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  reactRouterContext,
  context,
) {
  // Proteção contra erro de ambiente (undefined)
  const env = context.env || {};

  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN || 'checkout.shopify.com',
      storeDomain: env.PUBLIC_STORE_DOMAIN || 'brinqueteando.myshopify.com',
    },
    // Domínios externos permitidos
    connectSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://shop.app',
      'https://monorail-edge.shopifysvc.com',
      'https://judge.me',
      'https://*.judge.me',
      'https://*.google-analytics.com',
      'https://*.facebook.com',
      'https://analytics.ahrefs.com',
    ],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter
        context={reactRouterContext}
        url={request.url}
        nonce={nonce}
      />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
