var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var DatabaseORM = new ORM();


function ORM() {
  
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
    console.log('Database success');
  };

  open.onerror = function(err) {
    console.error('Database error');
    console.error(err);
  };

}

ORM.prototype.insertList = function(title, contents) {
  var tx = this.db.transaction(["List"], "readwrite"),
      store = tx.objectStore("List");

  tx.oncomplete = function(event) {
    console.log("All done!");
  };

  tx.onerror = function(error) {
    console.error(error)
  };

  store.put({title: title, contents: JSON.stringify(contents) });
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