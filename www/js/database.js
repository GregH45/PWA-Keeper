var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

var open = indexedDB.open("Keeper", 1);


// Create the schema
open.onupgradeneeded = function() {
    var db = open.result;
    var store = db.createObjectStore("List", { keyPath: "id", autoIncrement: true });
    
    store.createIndex("title", "title", { unique: false });
    store.createIndex("contents", "contents", { unique: false });
};

open.onsuccess = function() {
  var db = open.result;
  var tx = db.transaction("List", "readwrite");
  var store = tx.objectStore("List");
  
  console.log(store.getAll());
};