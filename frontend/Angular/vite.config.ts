import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 4200,
    host: 'localhost',
    proxy: {
      '/api': {
        target:
          process.env['services__pizzaapi__https__0'] || process.env['services__pizzaapi__http__0'],
        secure: process.env['NODE_ENV'] !== 'development',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
