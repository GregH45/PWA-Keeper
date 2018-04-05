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
      id: -1,
      title: '',
      contents: []
    },
    methods: {
      saveBtn: function() {
        DatabaseORM.insertList(this.title, this.contents, function(err) {
          if (!err) {
            console.log('Insertion finished');
          } else {
            console.error(err);
          }
        });
      },
      updateBtn: function() {
        if (this.id >= 0) {
          DatabaseORM.update(this.id, this.title, this.contents, function(evt) {
            if (evt && evt.type === 'success') {
              console.log('Update succeed');
            } else {
              console.error('Update failed');
              console.error(evt);
            }
          });
        }
      },
      resetBtn: function() {
        this.title = '';
        this.contents = [];
      },
      listBefore: function() {
        if (this.id > 0) {
          var that = this;
          DatabaseORM.get((this.id-1), function(result) {
            that.id = result.id;
            that.title = result.title;
            that.contents = result.contents;
          })
        }
      },
      listNext: function() {
        var that = this;
        DatabaseORM.getAllLists(function(lists) {
          if (that.id < lists.length) {
            DatabaseORM.get((that.id+1), function(result) {
              that.id = result.id;
              that.title = result.title;
              that.contents = result.contents;
            });
          }
        });
      }
    }
  });


  // Retrieve last list
  DatabaseORM.getLastList(function(list) {
    app.id = list.id;
    app.title = list.title;
    app.contents = list.contents;
  });

});