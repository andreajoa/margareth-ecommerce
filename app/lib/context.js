import {createHydrogenContext, createCartHandler} from '@shopify/hydrogen';
import {AppSession} from './session';
import {CART_FRAGMENT} from './queries';

export async function createHydrogenRouterContext(
  request,
  env,
  executionContext,
) {
  // Segurança: Garante que env existe
  const environment = env || {};
  const waitUntil = executionContext.waitUntil.bind(executionContext);
  
  // Segredos com fallback de emergência para não quebrar a loja
  const secrets = environment.SESSION_SECRET 
    ? [environment.SESSION_SECRET] 
    : ['temp-secret-key-fix-deploy'];

  const [cache, session] = await Promise.all([
    caches.open('hydrogen'),
    AppSession.init(request, secrets),
  ]);

  const hydrogenContext = createHydrogenContext({
    env: environment,
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

  return {
    ...hydrogenContext,
    cart,
  };
}
