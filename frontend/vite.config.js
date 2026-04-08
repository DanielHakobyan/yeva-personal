import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import vitePrerender from 'vite-plugin-prerender';
import Sitemap from 'vite-plugin-sitemap';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Sitemap({ hostname: process.env.VITE_SITE_URL || 'http://localhost:5173' }),
    ...(process.env.VITE_PRERENDER === 'true'
      ? [
          vitePrerender({
            staticDir: path.join(__dirname, 'dist'),
            routes: ['/', '/about', '/essays', '/contact', '/login'],
            renderer: new vitePrerender.PuppeteerRenderer({
              injectProperty: '__PRERENDER_INJECTED',
              inject: { prerender: true },
              // Avoid hanging if a render-trigger event isn't observed in headless mode.
              // Helmet tags + mock content for prerender should be ready within this window.
              renderAfterTime: 2500,
              headless: true,
              maxConcurrentRoutes: 2,
            }),
          }),
        ]
      : []),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // Our Express backend mounts routes like `/auth`, `/essays`, etc.
        // Since frontend calls `/api/...`, strip the `/api` prefix in local dev.
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
