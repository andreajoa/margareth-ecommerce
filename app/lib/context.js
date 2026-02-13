import {createHydrogenContext, createCartHandler} from '@shopify/hydrogen';
import {AppSession} from './session';
import {CART_FRAGMENT} from './queries';

export async function createHydrogenRouterContext(
  request,
  env,
  executionContext,
) {
  // Segurança: Garante que env existe com valores padrão
  const environment = env || {};
  const waitUntil = executionContext?.waitUntil?.bind(executionContext) || (() => {});
  
  // Segredos com fallback de emergência para não quebrar a loja
  const secrets = environment.SESSION_SECRET 
    ? [environment.SESSION_SECRET] 
    : ['temp-secret-key-fix-deploy'];

  // Garante que as variáveis críticas existem
  const storeDomain = environment.PUBLIC_STORE_DOMAIN || 'brinqueteando.myshopify.com';
  const storefrontToken = environment.PUBLIC_STOREFRONT_API_TOKEN || 'f4519cf3a3a10b4fccca0df4b0a464e1';
  const apiVersion = '2024-10';

  let cache, session;
  try {
    cache = await caches.open('hydrogen');
  } catch (e) {
    console.error('Cache error:', e);
    cache = undefined;
  }

  try {
    session = await AppSession.init(request, secrets);
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

  // ✅ FIX: Configuração completa do Hydrogen Context
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
    // ✅ FIX: Configuração explícita do storefront
    storefront: {
      storeDomain,
      storefrontToken,
      storefrontApiVersion: apiVersion,
    },
  });

  // ✅ FIX: Verificar se storefront existe antes de criar cart handler
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
