import {storefrontRedirect} from '@shopify/hydrogen';
import {createRequestHandler} from '@shopify/hydrogen/oxygen';
import {createreateCartHandler} from '@shopify/hydrogen';
import {AppSession} from './app/lib/session';
import {CART_FRAGMENT} from './app/lib/queries';

export default {
  async fetch(request, env, executionContext) {
    try {
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
      });

      const cart = createCartHandler({
        storefront: hydrogenContext.storefront,
        getCartId: session.get,
        cartFragment: CART_FRAGMENT,
      });

      const handleRequest = createRequestHandler({
        build: await import('virtual:react-router/server-build'),
        mode: process.env.NODE_ENV,
        getLoadContext: () => ({...hydrogenContext, cart}),
      });

      const response = await handleRequest(request);

      if (session.isPending) {
        response.headers.set(
          'Set-Cookie',
          await session.commit(),
        );
      }

      if (response.status === 404) {
        return storefrontRedirect({
          request,
          response,
          storefront: hydrogenContext.storefront,
        });
      }

      return response;
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
};
