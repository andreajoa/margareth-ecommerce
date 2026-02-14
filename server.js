import {createRequestHandler} from '@shopify/hydrogen/oxygen';
import {createHydrogenRouterContext} from './app/lib/context';

export default {
  async fetch(request, env, executionContext) {
    try {
      const context = await createHydrogenRouterContext(request, env, executionContext);

      const handleRequest = createRequestHandler({
        build: await import('virtual:react-router/server-build'),
        mode: process.env.NODE_ENV,
        getLoadContext: () => context,
      });

      const response = await handleRequest(request);

      // Salvar session cookie se houver mudanças (ex: cartId)
      if (context.session && context.session.isPending) {
        response.headers.append('Set-Cookie', await context.session.commit());
      }

      return response;
    } catch (error) {
      console.error('Server error:', error);
      return new Response('Error: ' + error.message, {status: 500});
    }
  },
};
