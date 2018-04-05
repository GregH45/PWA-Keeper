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
    '/js/vue.js',
    '/js/service-worker.js',
    '/js/app.js'
  ]

});

