import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => {
  const isSSRBuild = command === 'build' && (process.env.VITE_SSR === 'true' || mode === 'ssr');

  return {
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
    ],
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL || 'https://localhost:7160',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      outDir: isSSRBuild ? 'dist/server' : 'dist/client',
      sourcemap: true,
      minify: isSSRBuild ? false : 'terser',
      rollupOptions: {
        // Conditional entry points for SSR vs client builds
        input: isSSRBuild
          ? path.resolve(__dirname, './src/entry-server.tsx')
          : path.resolve(__dirname, './index.html'),

        output: isSSRBuild
          ? {
              format: 'es',
              entryFileNames: 'entry-server.js',
            }
          : {
              manualChunks: {
                'react-vendor': ['react', 'react-dom'],
                'query-vendor': ['@tanstack/react-query'],
                'router-vendor': ['react-router-dom'],
              },
            },

        // External dependencies for SSR build
        external: isSSRBuild ? ['react', 'react-dom', 'react-router-dom/server'] : [],
      },

      // Enable SSR-specific optimizations for React 19.2
      ssr: isSSRBuild,
      target: isSSRBuild ? 'node18' : 'esnext',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@features': path.resolve(__dirname, './src/features'),
        '@api': path.resolve(__dirname, './src/api'),
        '@lib': path.resolve(__dirname, './src/lib'),
        '@types': path.resolve(__dirname, './src/types'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@generated': path.resolve(__dirname, '../../clients/generated/react/src'),
      },
    },
    define: {
      __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
      __SSR__: JSON.stringify(isSSRBuild),
    },

    // SSR-specific configuration
    ssr: isSSRBuild
      ? {
          format: 'es',
          target: 'node',
          noExternal: [
            // Bundle these dependencies for SSR
            '@tanstack/react-query',
            'react-router-dom',
          ],
        }
      : undefined,

    // Optimize dependencies for React 19.2 features
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
      exclude: isSSRBuild ? ['react', 'react-dom'] : [],
    },
  };
});
