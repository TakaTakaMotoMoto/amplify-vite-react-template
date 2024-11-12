// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {VitePWA} from 'vite-plugin-pwa'; // PWA プラグインのインポート

export default defineConfig({
  server: {
    host: '0.0.0.0', // スマホや他の端末からアクセス可能にする設定
    port: 3000,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // サービスワーカーを自動的に更新
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1年
              },
            },
          },
          {
            urlPattern: /\/.*\.(?:js|css|html)/,
            handler: 'StaleWhileRevalidate', // 最新のキャッシュを即座に反映
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1週間
              },
            },
          },
        ],
      },
      manifest: {
        name: '冷蔵庫みまもるっち',
        short_name: '冷蔵庫みまもるっち',
        description: '冷蔵庫の状態を見守るアプリ',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
