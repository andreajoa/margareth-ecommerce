import {createHydrogenContext} from '@shopify/hydrogen';
import {AppSession} from './session';

export async function createHydrogenRouterContext(
  request,
  env,
  executionContext,
) {
  const waitUntil =
    executionContext?.waitUntil?.bind(executionContext) || (() => {});

  const [cache, session] = await Promise.all([
    caches.open('hydrogen').catch(() => undefined),
    AppSession.init(request, [
      env.SESSION_SECRET || 'fallback-secret-please-set-SESSION_SECRET',
    ]),
  ]);

  const hydrogenContext = createHydrogenContext({
    env: {
      ...env,
      PUBLIC_STORE_DOMAIN:
        env.PUBLIC_STORE_DOMAIN || 'brinqueteando.myshopify.com',
      PUBLIC_STOREFRONT_API_TOKEN:
        env.PUBLIC_STOREFRONT_API_TOKEN ||
        'f4519cf3a3a10b4fccca0df4b0a464e1',
    },
    request,
    cache,
    waitUntil,
    session,
    // NO custom cart fragment - Hydrogen's default works perfectly
    // The custom CartFragment was causing silent mutation errors
    // because Hydrogen expects "CartApiQuery" and "CartApiMutation" names
  });

  return hydrogenContext;
}
