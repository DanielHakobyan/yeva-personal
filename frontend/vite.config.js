import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import Sitemap from 'vite-plugin-sitemap';

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const plugins = [
    react(),
    tailwindcss(),
    Sitemap({ hostname: process.env.VITE_SITE_URL || 'http://localhost:5173' }),
  ];

  // IMPORTANT:
  // `vite-plugin-prerender` currently crashes under ESM in Vercel builds (uses `require(...)` in `.mjs`).
  // So we only load it dynamically if explicitly enabled.
  if (process.env.VITE_PRERENDER === 'true') {
    const vitePrerender = (await import('vite-plugin-prerender')).default;
    plugins.push(
      vitePrerender({
        staticDir: path.join(__dirname, 'dist'),
        routes: ['/', '/about', '/essays', '/contact', '/login'],
        renderer: new vitePrerender.PuppeteerRenderer({
          injectProperty: '__PRERENDER_INJECTED',
          inject: { prerender: true },
          renderAfterTime: 2500,
          headless: true,
          maxConcurrentRoutes: 2,
        }),
      }),
    );
  }

  return {
    plugins,
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
  };
});
