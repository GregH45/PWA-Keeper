window.addEventListener('load', function() {
	
    var SAVED_ID = -1;

	var home = new Vue({
		el: '#index',
		data: {
	        lists: []
    	},
    	methods: {
    		deleteList: function(e) {
                e.preventDefault();

                if (SAVED_ID >= 0) {
        			DatabaseORM.deleteList(SAVED_ID, function(evt) {
        				DatabaseORM.getAllLists(function(lists) {
        					home.lists = lists;
      					});
                        SAVED_ID = -1;
        			});
                }
    		},
            showConfirm: function(e) {
                e.preventDefault();
                $('#modal1').modal('open');
                SAVED_ID = e.target.id;
            },
            goToDetailled: function(e) {
                if (e.target.id) {
                    sessionStorage.setItem('listId', e.target.id);
                } else {
                    sessionStorage.setItem('listId', undefined);
                }
                
                window.location.href = 'detailled.html';
            }
        }

    });

    DatabaseORM.getAllLists(function(lists) {
        home.lists = lists;
    });


    var elem = document.querySelector('#modal1');
    var instance = M.Modal.init(elem);
    

});