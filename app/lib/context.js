import {createHydrogenContext, createCartHandler} from '@shopify/hydrogen';
import {AppSession} from './session';

export async function createHydrogenRouterContext(request, env, executionContext) {
  const environment = env || {};
  const waitUntil = executionContext?.waitUntil?.bind(executionContext) || (() => {});

  const secrets = environment.SESSION_SECRET 
    ? [environment.SESSION_SECRET] 
    : ['default-secret-key-2024'];

  let cache;
  try {
    cache = await caches.open('hydrogen');
  } catch (e) {
    cache = undefined;
  }

  let session;
  try {
    session = await AppSession.init(request, secrets);
  } catch (e) {
    session = {
      get: () => null,
      set: () => {},
      unset: () => {},
      commit: async () => '',
      isPending: false,
    };
  }

  const hydrogenContext = createHydrogenContext({
    env: {
      ...environment,
      PUBLIC_STORE_DOMAIN: environment.PUBLIC_STORE_DOMAIN || 'brinqueteando.myshopify.com',
      PUBLIC_STOREFRONT_API_TOKEN: environment.PUBLIC_STOREFRONT_API_TOKEN || 'f4519cf3a3a10b4fccca0df4b0a464e1',
    },
    request,
    cache,
    waitUntil,
    session,
  });

  const cart = createCartHandler({
    storefront: hydrogenContext.storefront,
    getCartId: () => session.get('cartId'),
    setCartId: (cartId) => session.set('cartId', cartId),
  });

  return {
    ...hydrogenContext,
    cart,
  };
}
