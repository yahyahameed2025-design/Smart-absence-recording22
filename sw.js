const CACHE_NAME = 'teacher-absence-cache-v17';
const urlsToCache = [
  './index.html',
  './صفوف_المعلمين.html',
  './مشكلات_المعلمين.html',
  './استقبال_الدردشة.html',
  './احصائيات_الغياب.html',
  './احدث نسخة سجل.html',
  './dark-theme.css',
  './particles-module.js',
  './manifest.json',
  './app-icon.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('Error caching files', err))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});
