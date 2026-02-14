import {createHydrogenContext, createCartHandler} from '@shopify/hydrogen';
import {AppSession} from './session';
import {CART_FRAGMENT} from './queries';

export async function createHydrogenRouterContext(
  request,
  env,
  executionContext,
) {
  const environment = env || {};
  const waitUntil = executionContext?.waitUntil?.bind(executionContext) || (() => {});

  const secrets = environment.SESSION_SECRET
    ? [environment.SESSION_SECRET]
    : ['s3cr3t-fallback-key-2024'];

  const storeDomain = environment.PUBLIC_STORE_DOMAIN || 'brinqueteando.myshopify.com';
  const storefrontToken = environment.PUBLIC_STOREFRONT_API_TOKEN || 'f4519cf3a3a10b4fccca0df4b0a464e1';

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
    console.error('Session init error:', e);
    // Fallback session object
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
      PUBLIC_STORE_DOMAIN: storeDomain,
      PUBLIC_STOREFRONT_API_TOKEN: storefrontToken,
    },
    request,
    cache,
    waitUntil,
    session,
  });

  let cart;
  try {
    cart = createCartHandler({
      storefront: hydrogenContext.storefront,
      getCartId: () => session.get('cartId'),
      setCartId: (cartId) => session.set('cartId', cartId),
      cartFragment: CART_FRAGMENT,
    });
  } catch (e) {
    console.error('Cart handler error:', e);
    cart = {
      get: async () => null,
      addLines: async () => ({}),
      updateLines: async () => ({}),
      removeLines: async () => ({}),
    };
  }

  return {
    ...hydrogenContext,
    cart,
  };
}
