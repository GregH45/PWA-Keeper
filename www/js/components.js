window.addEventListener('load', function() {

  // Définition des composants
  Vue.component('item', {
    template: '#item',
    props: [ 'elt' ],
    updated: function() {
      console.log('Item updated');
    },
    methods: {
      getItem: function() {
        return {
          value: this.elt.value,
          checked: this.elt.checked
        };
      },
      saveTick: function(e) {
        var title = this.elt.value,
            checked = e.target.checked;

        this.elt.checked = checked;
        this.$emit('update:elt', this.elt);
      }
    }
  });

  Vue.component('todo-list', {
    template: '#todoList',
    props: [ 'title', 'contents' ],
    data: function() {
      return {
        elt: {
          title: this.title,
          contents: this.contents
        }
      };
    },
    updated: function() {
      console.log('List Updated');
    },
    methods: {
      updateTitle: function(elt) {
        this.$emit('update:title', elt.target.value);
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

  Vue.component('')

});
