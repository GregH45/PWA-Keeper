window.addEventListener('load', function() {

  // Vérification & Installation du ServiceWorker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(function() {
        console.log('Service Worker is OK');
      })
      .catch(function(e) {
        console.error(e);
      });
  }

});