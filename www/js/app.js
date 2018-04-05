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


  // Définition des composants
  Vue.component('item', {
    template: '#item',
    props: [ 'elt' ],
    methods: {
      saveTick: function(e) {
        var title = this.$props.elt.value,
            checked = e.target.checked;

        console.log(title, checked)
      }
    }
  });

  Vue.component('todo-list', {
    template: '#todoList',
    data: function() {
      return {
        title: 'Liste de course',
        contents: [{
          checked: true,
          value: 'Carotte'
        }, {
          value: 'Banane'
        }]
      }
    },
    methods: {
      updateTitle: function() {
        console.log(this.title);
      },
      saveNewItem: function() {
        var elt = document.getElementById('in_new_element');

        this.contents.push({
          value: elt.value
        });
        elt.value = '';
      }
    }
  });


  // Initialisation de la Vue
  var app = new Vue({
    el: '#app'
  });

};