import {ServerRouter} from 'react-router';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';

export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  routerContext,
  loadContext
) {
  const body = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} />,
    {
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
  responseHeaders.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.shopify.com https://analytics.ahrefs.com https://shop.app https://shopify.com https://*.shopify.com https://*.myshopify.com; " +
    "style-src 'self' 'unsafe-inline' https://cdn.shopify.com https://fonts.googleapis.com; " +
    "img-src 'self' data: blob: https://cdn.shopify.com https://shopify.com https://*.myshopify.com https://*.shopify.com; " +
    "font-src 'self' https://fonts.gstatic.com https://cdn.shopify.com; " +
    "connect-src 'self' https://*.shopify.com https://*.myshopify.com https://monorail-edge.shopifysvc.com https://shop.app https://analytics.ahrefs.com; " +
    "media-src 'self' https://cdn.shopify.com https://*.shopify.com; " +
    "frame-src 'self' https://shop.app https://*.shopify.com https://*.myshopify.com; " +
    "object-src 'none'; " +
    "base-uri 'self';"
  );

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
