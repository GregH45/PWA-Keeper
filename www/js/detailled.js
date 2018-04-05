window.addEventListener('load', function() {

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
            M.toast({ html: 'List saved!' });
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
              M.toast({ html: 'List updated!' });
            } else {
              console.error('Update failed');
              console.error(evt);
            }
          });
        }
      },
      listBefore: function() {
        var that = this;
        DatabaseORM.getPrevious(this.id, function(result) {
          that.id = result.id;
          that.title = result.title;
          that.contents = result.contents;
        });
      },
      listNext: function() {
        var that = this;
        DatabaseORM.getNext(this.id, function(result) {
          that.id = result.id;
          that.title = result.title;
          that.contents = result.contents;
        });
      }
    }
  });

  // Search ID url parameter
  var urlQueries = window.location.search.substr(1, window.location.search.length).split('&'),
      searchId = urlQueries.filter(function(elt) {
        if (elt.split('=')[0] === 'id') {
          return true;
        }
        return false;
      });

  // ID parameter exist
  if (searchId.length > 0) {
    var id = searchId[0].split('=')[1];

    // Retrieve the list with the same id
    DatabaseORM.get(id, function(list) {
      app.id = list.id;
      app.title = list.title;
      app.contents = list.contents;
    })
  }


});