const CACHE_NAME = 'beauty-metrixs-v3-final';
const urlsToCache = [
  '/beautymetrixsv3/',
  '/beautymetrixsv3/index.html',
  '/beautymetrixsv3/manifest.json',
  '/beautymetrixsv3/icon-192.png',
  '/beautymetrixsv3/icon-512.png'
];

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch from cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Update service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
