const CACHE_NAME = 'keeper-cache',
      CACHE_FILES = [
          '/',
          '/index.html',
          '/manifest.json',
          '/js/vue.js',
          '/js/materialize.js',
          '/js/app.js',
          '/js/service-worker.js',
          '/css/materialize.min.css',
          '/css/app.css',
          '/fonts/MaterialIcons-Regular.eot',
          '/fonts/MaterialIcons-Regular.svg',
          '/fonts/MaterialIcons-Regular.woff2',
          '/fonts/MaterialIcons-Regular.woff',
          '/fonts/MaterialIcons-Regular.ttf',
          '/fonts/MaterialIcons-Regular.ijmap'
        ];

// Install Cache
self.addEventListener('install', function(e) {
  console.log('Cache Installation');

  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(CACHE_FILES);
      })
      .catch(function(err) {
        console.error('Error to install the application cache');
      })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activating');  
});

// Offline Response
self.addEventListener('fetch', function(e) {
  console.log(e.request.url);

  e.respondWith(
    caches
      .match(e.request)
      .then(function(res) {
        return res || fetch(e.request);
      })
      .catch(function(err) {
        console.error('Error to rend ' + e.request.url);
      })
  );
});

/*
(function(Config) {


})({

  // Nom du cache utilisé par le ServiceWorker
  CACHE_NAME: 'keeper-cache',
  
  // Liste des fichiers à mettre en cache
  CACHE_FILES: [
    '/',
    '/index.html',
    '/manifest.json',
    '/js/vue.js',
    '/js/materialize.js',
    '/js/app.js',
    '/js/service-worker.js',
    '/css/materialize.min.css',
    '/css/app.css',
    '/fonts/MaterialIcons-Regular.eot',
    '/fonts/MaterialIcons-Regular.svg',
    '/fonts/MaterialIcons-Regular.woff2',
    '/fonts/MaterialIcons-Regular.woff',
    '/fonts/MaterialIcons-Regular.ttf',
    '/fonts/MaterialIcons-Regular.ijmap'
  ]

});
*/