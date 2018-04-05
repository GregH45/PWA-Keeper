window.addEventListener('load', function() {

  // Définition des composants
  Vue.component('item', {
    template: '#item',
    props: [ 'elt' ],
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
      },
      deleteBtn: function() {
        this.$emit('remove-item', this.elt);
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
    methods: {
      updateTitle: function(elt) {
        this.$emit('update-title', elt.target.value);
      },
      saveNewItem: function() {
        var elt = document.getElementById('in_new_element');

        this.$emit('add-item', elt);
        this.contents.push({
          value: elt.value
        });
        elt.value = '';
      },
      remove: function(elt) {
        var index = this.contents.findIndex(function(item) {
          return item.value === elt.value;
        });

        if (index >= 0) {
          this.$emit('remove-item', index);
        }
      }
    }
  });

});
