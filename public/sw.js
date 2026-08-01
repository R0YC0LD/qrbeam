const CACHE = 'qrbeam-v2';
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(['./', './index.html', './manifest.webmanifest', './icon.svg'])).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request).then(response => {
  if (event.request.method === 'GET' && response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
  return response;
}))));
