// @ts-ignore
import {createRequestHandler} from '@shopify/hydrogen';
import {createHydrogenRouterContext} from './app/lib/context';
import * as remixBuild from 'virtual:react-router/server-build';

export default {
  async fetch(request, env, executionContext) {
    try {
      const hydrogenContext = await createHydrogenRouterContext(
        request,
        env,
        executionContext,
      );

      const handleRequest = createRequestHandler({
        build: remixBuild,
        mode: 'production', // Hardcoded seguro para Oxygen (não use process.env)
        getLoadContext: () => hydrogenContext,
      });

      const response = await handleRequest(request);

      if (hydrogenContext.session.isPending) {
        response.headers.set(
          'Set-Cookie',
          await hydrogenContext.session.commit(),
        );
      }

      if (response.status === 404) {
        // Fallback simplificado para não quebrar se o storefrontRedirect falhar
        return response;
      }

      return response;
    } catch (error) {
      console.error('CRITICAL SERVER ERROR:', error);
      return new Response('Internal Server Error', {status: 500});
    }
  },
};
