import {createHydrogenContext, createCartHandler} from '@shopify/hydrogen';
import {AppSession} from './session';
import {CART_FRAGMENT} from './queries';

export async function createHydrogenRouterContext(
  request,
  env,
  executionContext,
) {
  if (!env?.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is not set');
  }

  const waitUntil = executionContext.waitUntil.bind(executionContext);
  const [cache, session] = await Promise.all([
    caches.open('hydrogen'),
    AppSession.init(request, [env.SESSION_SECRET]),
  ]);

  const hydrogenContext = createHydrogenContext({
    env,
    request,
    cache,
    waitUntil,
    session,
  });

  // ✅ FIX: Customizar cart handler com fragment completo que inclui lines
  const cart = createCartHandler({
    storefront: hydrogenContext.storefront,
    getCartId: hydrogenContext.session.get,
    cartFragment: CART_FRAGMENT,
  });

  return {
    ...hydrogenContext,
    cart,
  };
}
