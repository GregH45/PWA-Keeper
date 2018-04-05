window.addEventListener('load', function() {
	
	var home = new Vue(
		el: '#index',
		data: {
	        contents: []
    	},

	});

	DatabaseORM.getAllLists(function(lists) {
    	home.contents = lists;
  	});
});