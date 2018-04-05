(function(Config) {

  // Install Cache
  self.addEventListener('install', function(e) {
    console.log('Cache Installation');

    e.waitUntil(
      caches
        .open(Config.CACHE_NAME)
        .then(function(cache) {
          return cache.addAll(Config.CACHE_FILES);
        })
        .catch(function(err) {
          console.error('Error to install the application cache', err);
        })
    );
  });

  self.addEventListener('activate', function(event) {
    console.log('Service Worker activating');  
  });

  // Offline Response
  self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches
        .match(e.request)
        .then(function(res) {
          return res || fetchAndCache(e.request);
        })
        .catch(function(err) {
          console.error('Error to rend ' + e.request.url);
        })
    );
  });

  function fetchAndCache(url) {
    return fetch(url)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return caches.open(CACHE_NAME)
          .then(function(cache) {
            cache.put(url, response.clone());
            return response;
          });
      })
      .catch(function(error) {
        console.log('Request failed:', error);
      });
  }

})({

  // Nom du cache utilisé par le ServiceWorker
  CACHE_NAME: 'keeper-cache',
  
  // Liste des fichiers à mettre en cache
  CACHE_FILES: [
    '/',
    '/index.html',
    '/detailled.html',
    '/service-worker.js',
    '/manifest.json',
    '/js/components.js',
    '/js/database.js',
    '/js/detailled.js',
    '/js/index.js',
    '/js/global.js',
    '/js/materialize.js',
    '/js/vue.js',
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
