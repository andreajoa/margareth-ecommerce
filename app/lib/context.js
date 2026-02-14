import {createHydrogenContext} from '@shopify/hydrogen';
import {AppSession} from './session';
import {CART_QUERY_FRAGMENT} from './fragments';

export async function createHydrogenRouterContext(request, env, executionContext) {
  const waitUntil = executionContext.waitUntil.bind(executionContext);
  
  const [cache, session] = await Promise.all([
    caches.open('hydrogen'),
    AppSession.init(request, env?.SESSION_SECRET ? [env.SESSION_SECRET] : ['fallback-secret']),
  ]);

  const hydrogenContext = createHydrogenContext({
    env: env || {},
    request,
    cache,
    waitUntil,
    session,
    i18n: {language: 'PT', country: 'BR'},
    cart: {
      queryFragment: CART_QUERY_FRAGMENT,
    },
  });

  return hydrogenContext;
}
