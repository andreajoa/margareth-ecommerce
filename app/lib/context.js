import {createHydrogenContext} from '@shopify/hydrogen';
import {AppSession} from './session';
import {CART_FRAGMENT} from './queries';

/**
 * Creates the Hydrogen context for every request.
 * 
 * FIXED:
 *  - Removed invalid `storefront` option (was overwriting the real client)
 *  - Cart is configured inside createHydrogenContext
 *  - Session uses proper class with isPending tracking
 */
export async function createHydrogenRouterContext(
  request,
  env,
  executionContext,
) {
  const waitUntil = executionContext.waitUntil.bind(executionContext);

  /**
   * Open cache and initialize session in parallel.
   * SESSION_SECRET comes from Oxygen environment variables.
   * Fallback ensures the store doesn't crash if it's missing.
   */
  const [cache, session] = await Promise.all([
    caches.open('hydrogen').catch(() => undefined),
    AppSession.init(request, [
      env.SESSION_SECRET || 'fallback-secret-please-set-SESSION_SECRET',
    ]),
  ]);

  /**
   * createHydrogenContext reads PUBLIC_STORE_DOMAIN and
   * PUBLIC_STOREFRONT_API_TOKEN from `env` to build the
   * Storefront API client. Do NOT pass a `storefront` key —
   * that would overwrite the real client with a plain object.
   */
  console.log('[CONTEXT DEBUG] Creating Hydrogen context with env keys:', Object.keys(env).filter(k => k.includes('STORE')));
  const hydrogenContext = createHydrogenContext({
    env,
    request,
    cache,
    waitUntil,
    session,
    cart: {
      queryFragment: CART_FRAGMENT,
    },
  });

  console.log('[CONTEXT DEBUG] storefront type:', typeof hydrogenContext.storefront);
  console.log('[CONTEXT DEBUG] storefront has query:', typeof hydrogenContext.storefront?.query);
  console.log('[CONTEXT DEBUG] storefront has mutate:', typeof hydrogenContext.storefront?.mutate);

  return hydrogenContext;
}
