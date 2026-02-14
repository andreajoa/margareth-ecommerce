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

  // Secrets para sessão
  const secrets = environment.SESSION_SECRET
    ? [environment.SESSION_SECRET]
    : ['fallback-secret-key-for-development'];

  // Variáveis de ambiente com fallback
  const storeDomain = environment.PUBLIC_STORE_DOMAIN || 'brinqueteando.myshopify.com';
  const storefrontToken = environment.PUBLIC_STOREFRONT_API_TOKEN || 'f4519cf3a3a10b4fccca0df4b0a464e1';

  // Cache
  let cache;
  try {
    cache = await caches.open('hydrogen');
  } catch (e) {
    console.error('Cache error:', e);
    cache = undefined;
  }

  // Session
  let session;
  try {
    session = await AppSession.init(request, secrets);
  } catch (e) {
    console.error('Session error:', e);
    session = new AppSession();
  }

  // ✅ FIX: Criar contexto SEM a opção storefront inválida
  // createHydrogenContext usa env.PUBLIC_STORE_DOMAIN e env.PUBLIC_STOREFRONT_API_TOKEN automaticamente
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

  // ✅ FIX: Criar cart handler com getCartId correto
  const cart = createCartHandler({
    storefront: hydrogenContext.storefront,
    getCartId: () => {
      const cartId = session.get('cartId');
      return cartId;
    },
    setCartId: (cartId) => {
      session.set('cartId', cartId);
    },
    cartFragment: CART_FRAGMENT,
  });

  return {
    ...hydrogenContext,
    cart,
  };
}
