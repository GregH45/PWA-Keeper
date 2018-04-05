var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var DatabaseORM = new ORM();

function findIdInList(id, arr) {
  for (var i=0; i<arr.length; i++) {
    if (arr[i].id === id) {
      return i;
    }
  }

  return -1;
}

function ORM() {

  if (!indexedDB) {
    alert('No Database System');
  }
  
  var open = indexedDB.open("Keeper", 1);
  var that = this;

  // Create the schema
  open.onupgradeneeded = function() {
      that.db = open.result;
      var store = that.db.createObjectStore("List", { keyPath: "id", autoIncrement: true });
      
      store.createIndex("title", "title", { unique: false });
      store.createIndex("contents", "contents", { unique: false });
  };

  open.onsuccess = function() {
    that.db = open.result;
  };

  open.onerror = function(err) {
    console.error('Database error');
    console.error(err);
  };

}

ORM.prototype.insertList = function(title, contents, fn) {
  var tx = this.db.transaction(["List"], "readwrite"),
      store = tx.objectStore("List");

  tx.oncomplete = function() {
    if (fn) {
      fn(false);
    }
  };

  tx.onerror = function(error) {
    if (fn) {
      fn(error);
    }
  };

  store.put({ title: title, contents: JSON.stringify(contents) });
};

ORM.prototype.update = function(id, title, contents, fn) {
  if (this.db) {
    var store = this.db.transaction(["List"], "readwrite").objectStore("List"),
        request = store.get(id);

    request.onerror = function(err) {
      if (fn) {
        fn(err);
      }
    };

    request.onsuccess = function(e) {
      var data = request.result;
      
      // On met à jour ce(s) valeur(s) dans l'objet
      data.title = title;
      data.contents = JSON.stringify(contents);

      // Et on remet cet objet à jour dans la base
      var requestUpdate = store.put(data);

      requestUpdate.onerror = function(err) {
        if (fn) {
          fn(err);
        }
      };
      requestUpdate.onsuccess = function(e) {
        if (fn) {
          fn(e);
        }
      };
    };
  }
};

ORM.prototype.getAllLists = function(fn) {
  if (this.db) {
    var transaction = this.db.transaction(["List"]),
        objectStore = transaction.objectStore("List"),
        request = objectStore.getAll();
    
    request.onerror = function(err) {
      console.error('Request Error');
    };
    
    request.onsuccess = function() {
      var result = request.result;

      for (var i=0; i<result.length; i++) {
        result[i].contents = JSON.parse(result[i].contents);
      }

      if (fn) {
        fn(result);
      }
    };
  } else {
    var that = this;
    setTimeout(function() {
      that.getAllLists(fn);
    }, 200);
  }
};

ORM.prototype.getLastList = function(fn) {
  this.getAllLists(function(lists) {
    if (lists && lists.length > 0) {
      fn(lists[lists.length-1]);
    } else {
      fn(false);
    }
  })
};

ORM.prototype.get = function(id, fn) {
  if (this.db) {
    var transaction = this.db.transaction(["List"]),
        objectStore = transaction.objectStore("List"),
        request = objectStore.get(parseInt(id));
        
    request.onerror = function(err) {
      if (fn) {
        fn(false);
      }
    };
    
    request.onsuccess = function() {
      var result = request.result;

      result.contents = JSON.parse(result.contents);
      
      if (fn) {
        fn(result);
      }
    };
  } else {
    var that = this;
    setTimeout(function() {
      that.get(id, fn);
    }, 200);
  }
};

ORM.prototype.getPrevious = function(id, fn) {
  if (this.db) {
    var that = this;

    this.getAllLists(function(lists) {
      if (lists) {
        var arrId = findIdInList(id, lists);

        if (arrId > 0) {
          var transaction = that.db.transaction(["List"]),
              objectStore = transaction.objectStore("List"),
              request = objectStore.get(lists[(arrId-1)].id);

          request.onerror = function(err) {
            console.error('Request Error');
          };
          
          request.onsuccess = function() {
            var result = request.result;

            if (result) {
              result.contents = JSON.parse(result.contents);
              
              if (fn) {
                fn(result);
              }
            } else {
              fn(false);
            }
          };
        } 
      }
    });
  }
};

ORM.prototype.getNext = function(id, fn) {
  if (this.db) {
    var that = this;

    this.getAllLists(function(lists) {
      if (lists) {
        var arrId = findIdInList(id, lists);

        if (arrId < (lists.length-1)) {
          var transaction = that.db.transaction(["List"]),
              objectStore = transaction.objectStore("List"),
              request = objectStore.get(lists[(arrId+1)].id);

          request.onerror = function(err) {
            console.error('Request Error');
          };
          
          request.onsuccess = function() {
            var result = request.result;

            if (result) {
              result.contents = JSON.parse(result.contents);
              
              if (fn) {
                fn(result);
              }
            } else {
              fn(false);
            }
          };
        } 
      }
    });
  }
};

ORM.prototype.getLastList = function(fn) {
  this.getAllLists(function(lists) {
    if (lists && lists.length > 0) {
      fn(lists[lists.length-1]);
    } else {
      fn(false);
    }
  })
};

ORM.prototype.deleteList = function(id, fn) {
  if (this.db) {
    var transaction = this.db.transaction(["List"]),
        objectStore = transaction.objectStore("List"),
        request = objectStore.delete(parseInt(id));
        
    request.onerror = function(err) {
      if (fn) {
        fn(false);
      }
    };
    
    request.onsuccess = function() {
      var result = request.result;

      result.contents = JSON.parse("{success: true}");
      
      if (fn) {
        fn(result);
      }
    };
  } else {
    var that = this;
    setTimeout(function() {
      that.get(id, fn);
    }, 200);
  }
};