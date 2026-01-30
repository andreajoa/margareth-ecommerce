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
      // React
      'react',
      'react-dom',
      'react/jsx-runtime',

      // Remix
      '@remix-run/react',
      '@remix-run/node',
      '@remix-run/router',
      '@remix-run/server-runtime',

      // Shopify
      '@shopify/hydrogen',
      '@shopify/hydrogen-react',

      // GraphQL
      'graphql',
      'graphql-tag',
    ],
  },
});
