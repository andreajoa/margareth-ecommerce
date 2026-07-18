import {
  createHydrogenContext,
  createCartHandler,
  cartGetIdDefault,
  cartSetIdDefault,
} from '@shopify/hydrogen';
import {RouterContextProvider} from 'react-router';
import {AppSession} from './session';
import {CART_QUERY_FRAGMENT, CART_MUTATE_FRAGMENT} from './queries';

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
    cart: {
      queryFragment: CART_QUERY_FRAGMENT,
    },
  });

  const cart = createCartHandler({
    storefront: hydrogenContext.storefront,
    getCartId: cartGetIdDefault(request.headers),
    setCartId: cartSetIdDefault(),
    cartQueryFragment: CART_QUERY_FRAGMENT,
    cartMutateFragment: CART_MUTATE_FRAGMENT,
  });

  const loadContext = {
    ...hydrogenContext,
    cart,
  };

  const context = new RouterContextProvider();
  Object.assign(context, loadContext);
  return context;
}
