// @ts-ignore
import {createRequestHandler} from '@shopify/hydrogen';
import {createHydrogenRouterContext} from './app/lib/context';
import * as remixBuild from 'virtual:react-router/server-build';

export default {
  async fetch(request, env, executionContext) {
    const url = new URL(request.url);
    
    // Handle favicon.ico explicitly to avoid 500 errors
    if (url.pathname === '/favicon.ico') {
      return new Response(null, {
        status: 204,
        headers: { 'Content-Type': 'image/x-icon' }
      });
    }
    
    let hydrogenContext = null;
    
    try {
      console.log('[DEBUG] Creating hydrogen context for:', url.pathname);
      hydrogenContext = await createHydrogenRouterContext(
        request,
        env,
        executionContext,
      );
      console.log('[DEBUG] Hydrogen context created successfully');
    } catch (contextError) {
      console.error('[CRITICAL] Hydrogen context creation failed:', contextError);
      return new Response(
        `<!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>brinqueTEAndo - Erro de Configuração</title>
        </head>
        <body>
          <h1>Erro de Configuração</h1>
          <p>Não foi possível inicializar a aplicação. Por favor, entre em contato.</p>
        </body>
        </html>`,
        { status: 500, headers: { 'Content-Type': 'text/html' } }
      );
    }
    
    try {
      console.log('[DEBUG] Creating request handler');

      const handleRequest = createRequestHandler({
        build: remixBuild,
        mode: 'production',
        getLoadContext: () => hydrogenContext,
      });

      const response = await handleRequest(request);

      if (hydrogenContext?.session?.isPending) {
        console.log('[DEBUG] Session isPending is TRUE, committing...');
        try {
          const cookie = await hydrogenContext.session.commit();
          console.log('[DEBUG] Session committed, cookie length:', cookie.length);
          response.headers.set('Set-Cookie', cookie);
        } catch (e) {
          console.error('Session commit error:', e);
        }
      } else {
        console.log('[DEBUG] Session isPending is false, skipping commit');
      }

      return response;
    } catch (error) {
      console.error('CRITICAL SERVER ERROR:', error);
      
      // Return a user-friendly error page
      return new Response(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>brinqueTEAndo - Erro Temporário</title>
          <style>
            body { font-family: system-ui, sans-serif; text-align: center; padding: 2rem; background: #FEFDF8; }
            .container { max-width: 500px; margin: 0 auto; }
            h1 { color: #3A8ECD; }
            p { color: #666; }
            a { color: #FB8A38; text-decoration: none; }
            .btn { display: inline-block; margin-top: 1rem; padding: 0.8rem 2rem; background: #3A8ECD; color: white; border-radius: 50px; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>😕 Erro Temporário</h1>
            <p>Estamos passando por uma manutenção rápida. Por favor, tente novamente em alguns segundos.</p>
            <a href="/" class="btn">Tentar Novamente</a>
          </div>
        </body>
        </html>
      `, {
        status: 500,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
  },
};
