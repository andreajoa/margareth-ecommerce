import { defineConfig } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';
import { hydrogen } from '@shopify/hydrogen/vite';

export default defineConfig({
  plugins: [
    hydrogen(),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
  ],
  ssr: {
    noExternal: [
      // React & ReactDOM
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-dev-runtime',
      'react/jsx-runtime',

      // Remix
      '@remix-run/react',
      '@remix-run/node',
      '@remix-run/router',
      '@remix-run/server-runtime',
      '@remix-run/server-runtime/dist',

      // Shopify
      '@shopify/hydrogen',
      '@shopify/hydrogen-react',
      '@shopify/hydrogen-react/dist',

      // GraphQL
      'graphql',
      'graphql-tag',
      'graphql/validation',
      'graphql/utilities',

      // Outros
      '@xstate/react',
      '@xstate/react/family',
    ],
  },
});
