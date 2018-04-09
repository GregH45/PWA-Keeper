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
        var that = this;
        DatabaseORM.insertList(this.title, this.contents, function(result) {
          if (result instanceof Object) {
            console.error(result);
          } else {
            that.id = result;
            M.toast({ html: 'List saved!' });
          }
        });
      },
      updateBtn: function() {
        if (this.id >= 0) {
          DatabaseORM.update(this.id, this.title, this.contents, function(evt) {
            if (evt && evt.type === 'success') {
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
      },
      remove: function(id) {
        this.contents = this.contents.filter(function(elt, index) {
          return id !== index;
        });
        //this.updateBtn();
      },
      updateTitle: function(title) {
        this.title = title;
      }
    }
  });

  // Search ID url parameter
  var listId = sessionStorage.getItem('listId');

  // ID parameter exist
  if (listId) {
    // Retrieve the list with the same id
    DatabaseORM.get(listId, function(list) {
      app.id = list.id;
      app.title = list.title;
      app.contents = list.contents;
    })
  }


});