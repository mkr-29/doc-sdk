import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'index.ts',
    'core/index': 'core/index.ts',
    'admin/index': 'admin/index.ts',
    'client/index': 'client/index.ts',
    'hooks/index': 'hooks/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ['react', 'react-dom'],
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.cjs',
    };
  },
  onSuccess: async () => {
    const fs = await import('fs');
    fs.copyFileSync('client/styles/doc-sdk.css', 'dist/styles.css');
  },
});
