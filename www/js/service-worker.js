(function(Config) {

  self.addEventListener('install', function(e) {
    e.waitUntil(
      caches
        .open(Config.CACHE_NAME)
        .then(function(cache) {
          return cache.addAll(Config.CACHE_FILES);
        })
    );
  });

})({

  // Nom du cache utilisé par le ServiceWorker
  CACHE_NAME: 'keeper-cache',
  
  // Liste des fichiers à mettre en cache
  CACHE_FILES: [
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
