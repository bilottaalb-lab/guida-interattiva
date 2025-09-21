const CACHE_NAME = 'guida-cache-v1';
const FILES_TO_CACHE = [
  '/guida-interattiva/index.html',
  '/guida-interattiva/manifest.json',
  '/guida-interattiva/icon-192.png',
  '/guida-interattiva/icon-512.png'
];

// Installazione: cache iniziale
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Attivazione: pulizia cache vecchie
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: risposte dalla cache o dal network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
