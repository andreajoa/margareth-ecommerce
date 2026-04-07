import {createHydrogenContext, createCartHandler} from '@shopify/hydrogen';
import {unstable_RouterContextProvider as RouterContextProvider} from 'react-router';
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

  const cart = createCartHandler({
    storefront: hydrogenContext.storefront,
    getCartId: hydrogenContext.session.get,
    cartFragment: CART_FRAGMENT,
  });

  const context = {
    ...hydrogenContext,
    cart,
  };

  return new RouterContextProvider(context);
}
