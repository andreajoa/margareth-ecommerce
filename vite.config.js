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
    target: 'webworker',
    external: ['@remix-run/node'],
    noExternal: true,
    resolve: {
      conditions: ['worker', 'browser'],
      externalConditions: ['worker'],
    },
  },
  build: {
    assetsInlineLimit: 0,
  },
});