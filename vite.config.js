import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {vitePlugin as remix} from '@remix-run/dev';

export default defineConfig({
  plugins: [
    hydrogen(),
    oxygen(),
    remix({
      presets: [hydrogen.preset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
  ],
  ssr: {
    optimizeDeps: {
      include: [],
    },
    noExternal: [
      // This is critical - bundle everything for Oxygen
      /^(?!node:)/,
    ],
  },
  resolve: {
    alias: {
      // Provide browser-compatible alternatives
      'stream': 'stream-browserify',
      'buffer': 'buffer/',
    },
  },
  build: {
    assetsInlineLimit: 0,
  },
});