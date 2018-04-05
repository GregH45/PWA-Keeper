window.addEventListener('load', function() {
	
	var home = new Vue({
		el: '#index',
		data: {
	        lists: []
    	},
    	methods: {
    		deleteList: function(e) {
                e.preventDefault();
    			DatabaseORM.deleteList(e.target.id, function(evt) {
    				DatabaseORM.getAllLists(function(lists) {
    					home.lists = lists;
  					});
    			});
    		}
    	}

	});

	DatabaseORM.getAllLists(function(lists) {
    	home.lists = lists;
  	});
});