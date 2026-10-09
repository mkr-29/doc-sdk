import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [react()],
  resolve: {
    alias: {
      '@mkr-29/doc-sdk': path.resolve(__dirname, '../index.ts'),
      '@mkr/doc-sdk': path.resolve(__dirname, '../index.ts'),
    },
  },
  server: {
    port: 3000,
    open: false,
  },
});
