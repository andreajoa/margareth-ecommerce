import {createHydrogenContext, createCartHandler} from '@shopify/hydrogen';
import {AppSession} from './session';
import {CART_FRAGMENT} from './queries';

export async function createHydrogenRouterContext(
  request,
  env,
  executionContext,
) {
  // Security: Ensure env exists with default values
  const environment = env || {};
  const waitUntil = executionContext?.waitUntil?.bind(executionContext) || (() => {});
  
  // Secrets with emergency fallback to not break the store
  const secrets = environment.SESSION_SECRET 
    ? [environment.SESSION_SECRET] 
    : ['temp-secret-key-fix-deploy'];

  // Ensure critical variables exist
  const storeDomain = environment.PUBLIC_STORE_DOMAIN || 'brinqueteando.myshopify.com';
  const storefrontToken = environment.PUBLIC_STOREFRONT_API_TOKEN || 'f4519cf3a3a10b4fccca0df4b0a464e1';
  const apiVersion = '2024-10';

  let cache, session;
  try {
    console.log('[DEBUG] Opening cache');
    cache = await caches.open('hydrogen');
    console.log('[DEBUG] Cache opened successfully');
  } catch (e) {
    console.error('Cache error:', e);
    cache = undefined;
  }

  try {
    console.log('[DEBUG] Initializing session with secrets:', secrets ? 'yes' : 'no');
    session = await AppSession.init(request, secrets);
    console.log('[DEBUG] Session initialized successfully');
  } catch (e) {
    console.error('Session error:', e);
    // Fallback session
    session = {
      get: () => null,
      set: () => {},
      unset: () => {},
      commit: async () => '',
      isPending: false,
    };
  }

  // Create Hydrogen Context
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
    storefront: {
      storeDomain,
      storefrontToken,
      storefrontApiVersion: apiVersion,
    },
  });

  // Create cart handler if storefront exists
  let cart;
  try {
    if (hydrogenContext?.storefront) {
      cart = createCartHandler({
        storefront: hydrogenContext.storefront,
        getCartId: hydrogenContext.session.get,
        cartFragment: CART_FRAGMENT,
      });
    } else {
      // Fallback cart handler
      cart = {
        get: async () => null,
        add: async () => null,
        update: async () => null,
        remove: async () => null,
      };
    }
  } catch (e) {
    console.error('Cart handler error:', e);
    cart = {
      get: async () => null,
      add: async () => null,
      update: async () => null,
      remove: async () => null,
    };
  }

  return {
    ...hydrogenContext,
    cart,
  };
}
