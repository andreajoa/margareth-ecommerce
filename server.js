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

      return await handleRequest(request);
    } catch (error) {
      return new Response('Error: ' + String(error), {status: 500});
    }
  },
};
