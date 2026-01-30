import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {vitePlugin as remix} from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    hydrogen(),
    remix({
      presets: [hydrogen.preset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  ssr: {
    optimizeDeps: {
      include: [],
    },
    noExternal: true,
    resolve: {
      conditions: ['workerd', 'worker', 'browser'],
      externalConditions: ['workerd', 'worker'],
    },
  },
  resolve: {
    alias: {
      'stream': 'stream-browserify',
      'buffer': 'buffer/',
      'assert': 'assert/',
      'util': 'util/',
      'process': 'process/browser',
    },
  },
  define: {
    'process.env.NODE_DEBUG': 'false',
  },
  build: {
    assetsInlineLimit: 0,
  },
});