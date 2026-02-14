import {createHydrogenContext} from '@shopify/hydrogen';
import {createAppSession} from './session';

export async function createHydrogenRouterContext(request, env, executionContext) {
  const session = await createAppSession(
    request, 
    env?.SESSION_SECRET ? [env.SESSION_SECRET] : ['fallback-secret']
  );

  const hydrogenContext = createHydrogenContext({
    env: env || {},
    request,
    session,
    waitUntil: executionContext?.waitUntil?.bind(executionContext),
  });

  return {
    ...hydrogenContext,
    session,
  };
}
