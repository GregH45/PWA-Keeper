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


  // Initialisation de la Vue
  var app = new Vue({
    el: '#app',
    data: {
      title: '',
      contents: []
    },
    created: function() {
      var that = this;
      DatabaseORM.getLastList(function(list) {
        that.title = list.title;
        that.contents = list.contents;
      })
    },
    updated: function() {
      console.log('Parent Updated');
    },
    methods: {
      saveBtn: function() {
        DatabaseORM.insertList(this.title, this.contents);
      },
      resetBtn: function() {
        this.title = '';
        this.contents = [];
      }
    }
  });

});