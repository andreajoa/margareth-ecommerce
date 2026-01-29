import {createRequestHandler} from '@remix-run/server-runtime';
import {storefrontRedirect} from '@shopify/hydrogen';

export default {
  async fetch(request, env, executionContext) {
    try {
      const url = new URL(request.url);
      
      // Handle Shopify canonical URL redirects
      const response = await storefrontRedirect({request, env});
      if (response) {
        return response;
      }

      // Create Remix request handler
      const handleRequest = createRequestHandler({
        build: await import('./build/index.js'),
        mode: process.env.NODE_ENV,
      });

      return handleRequest(request);
    } catch (error) {
      return new Response('Error', {status: 500});
    }
  },
};
