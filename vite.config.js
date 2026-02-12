import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {reactRouter} from '@react-router/dev/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    hydrogen(),
    oxygen(),
    reactRouter(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '~': '/app',
    },
  },
  build: {
    // Reduz o tamanho do chunk para evitar timeout no worker
    assetsInlineLimit: 0,
  },
});
