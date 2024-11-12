// src/service-worker.js
self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
    event.waitUntil(
      caches.open('my-cache').then((cache) => {
        return cache.addAll([
          '/index.html',
          '/static/js/bundle.js',
          '/static/js/vendors~main.chunk.js',
          '/static/css/main.chunk.css',
        ]);
      })
    );
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
  });
  