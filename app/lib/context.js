import {createHydrogenContext} from '@shopify/hydrogen';
import {AppSession} from './session';

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

  return createHydrogenContext({
    env,
    request,
    cache,
    waitUntil,
    session,
  });
}
