import {createHydrogenContext} from '@shopify/hydrogen';
import {AppSession} from './session';
import {CART_FRAGMENT} from './queries';

/**
 * Creates the Hydrogen context for every request.
 *
 * FIXES:
 *  - Removed invalid `storefront` option (was overwriting the real Storefront client)
 *  - Cart configured via built-in `cart` option (proper getCartId/setCartId)
 *  - Session uses class with isPending tracking
 */
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

  /**
   * createHydrogenContext reads PUBLIC_STORE_DOMAIN and
   * PUBLIC_STOREFRONT_API_TOKEN from `env` to build the
   * Storefront API client automatically.
   *
   * Do NOT pass a `storefront` key — that overwrites the
   * real client (which has .query()/.mutate()) with a plain object.
   */
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
    cart: {
      queryFragment: CART_FRAGMENT,
    },
  });

  return hydrogenContext;
}
