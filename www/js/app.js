window.onload = function() {

  // Vérification & Installation du ServiceWorker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/js/service-worker.js')
      .then(function() {
        console.log('Service Worker is OK');
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello World!'
    }
  });

};