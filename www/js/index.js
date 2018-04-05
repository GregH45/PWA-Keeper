window.addEventListener('load', function() {
	
	var home = new Vue({
		el: '#index',
		data: {
	        lists: []
    	}
	});

	DatabaseORM.getAllLists(function(lists) {
    	home.lists = lists;
  	});
});