import {defineConfig} from 'vite';
import {vitePlugin as remix} from '@shopify/cli-hydrogen/remix';

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
  ],
});
