import {ServerRouter} from 'react-router';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  routerContext,
  loadContext
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: loadContext.env?.PUBLIC_CHECKOUT_DOMAIN || 'checkout.shopify.com',
      storeDomain: loadContext.env?.PUBLIC_STORE_DOMAIN || 'brinqueteando.myshopify.com',
    },
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      "https://cdn.shopify.com",
      "https://fonts.googleapis.com",
    ],
    scriptSrc: [
      "'self'",
      "'unsafe-inline'",
      "https://cdn.shopify.com",
      "https://analytics.ahrefs.com",
      "https://shop.app",
    ],
    imgSrc: [
      "'self'",
      "data:",
      "https://cdn.shopify.com",
      "https://shopify.com",
      "https://*.myshopify.com",
    ],
    mediaSrc: [
      "'self'",
      "https://cdn.shopify.com",
      "https://*.shopify.com",
    ],
    connectSrc: [
      "'self'",
      "https://monorail-edge.shopifysvc.com",
      "https://*.shopify.com",
      "https://*.myshopify.com",
      "https://shop.app",
      "https://analytics.ahrefs.com",
    ],
    fontSrc: [
      "'self'",
      "https://fonts.gstatic.com",
      "https://cdn.shopify.com",
    ],
    frameSrc: [
      "'self'",
      "https://shop.app",
      "https://*.shopify.com",
    ],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter context={routerContext} url={request.url} nonce={nonce} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    }
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
