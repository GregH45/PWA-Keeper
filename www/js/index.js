window.addEventListener('load', function() {
	
	var home = new Vue({
		el: '#index',
		data: {
	        lists: []
    	},
    	methods: {
    		deleteList: function(e) {
    			console.log(e.target.id);
    			DatabaseORM.deleteList(e.target.id, function(evt) {
    				console.log("deleted");
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