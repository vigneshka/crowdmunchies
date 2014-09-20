var cmControllers = angular.module('cmControllers', []);

cmControllers.controller('DropListCtrl', ['$scope', '$firebase',
	function ($scope, $firebase) {
		var ref = new Firebase("https://crowdwhat.firebaseio.com");
		$scope.drops = $firebase(ref).$asArray();
	}]);

cmControllers.controller('OrderCtrl', ['$scope',
	function ($scope) {

		var init = function() {
			$scope.invoice = {
		        items: [{
		            qty: 10,
		            description: 'item',
		            cost: 9.95
		        }]
		    };	

		};

		$scope.menu = [
			{number:1, sandwich:"PEPE", price:4.59, description:"Real applewood smoked ham and provolone cheese garnished with lettuce, tomato, and mayo."},
			{number:2, sandwich:"BIG JOHN", price:4.59, description:"Medium rare choice roast beef, topped with yummy mayo, lettuce, and tomato."},
			{number:3, sandwich:"TOTALLY TUNA", price:4.59, description:"Fresh housemade tuna, mixed with celery, onions, and our tasty sauce, then topped with cucumber, lettuce, and tomato."},
			{number:4, sandwich:"TURKEY TOM", price:4.59, description:"Fresh sliced turkey breast, topped with lettuce, tomato, and mayo."},
			{number:5, sandwich:"VITO", price:4.59, description:"The original italian sub with genoa salami, provolone, capicola, onion, lettuce, tomato & a real tasty italian vinagrette."},
			{number:6, sandwich:"VEGETARIAN", price:4.59, description:"Layers of provolone cheese separated by real avacado spread, sliced cucumber, lettuce, tomato, and mayo."},
			{number:7, sandwich:"GOURMET SMOKED HAM CLUB", price:5.59, description:"A full 1/4 pound of real applewood smoked ham, provolone cheese, lettuce, tomato, & real mayo!"},
			{number:8, sandwich:"BILLY CLUB", price:5.59, description:"Choice roast beef, smoked ham, provolone cheese, Dijon mustard, lettuce, tomato, & mayo."},
			{number:9, sandwich:"ITALIAN NIGHT CLUB", price:5.59, description:"Real genoa salami, Italian capicola, smoked ham, and provolone cheese all topped with lettuce, tomato, onion, mayo, and our homemade italian vinagrette."},
			{number:10, sandwich:"HUNTER'S CLUB", price:5.59, description:"A full 1/4 pound of fresh sliced medium rare roast beef, provolone, lettuce, tomato, & mayo."},
			{number:11, sandwich:"COUNTRY CLUB", price:5.59, description:"Fresh sliced turkey brest, applewood smoked ham, provolone, and tons of lettuce, tomato, and mayo!"},
			{number:12, sandwich:"BEACH CLUB", price:5.59, description:"Fresh baked turkey breast, provolone cheese, avocado spread, sliced cucumber, lettuce, tomato, and mayo!"},
			{number:13, sandwich:"GOURMET VEGGIE CLUB", price:5.59, description:"Double provolone, real avocado spread, sliced cucumber, lettuce, tomato, & mayo."},
			{number:14, sandwich:"BOOTLEGGER CLUB", price:5.59, description:"Roast beef, turkey breast, lettuce, tomato, & mayo. An American classic, certainly not invented by J.J. but definitely tweaked and fine-tuned to perfection!"},
			{number:15, sandwich:"CLUB TUNA", price:5.59, description:"The same as out #3 Totally Tuna except this one has a lot more. Homemade tuna salad, provolone, cucumber, lettuce, & tomato."},
			{number:16, sandwich:"CLUB LULU", price:5.59, description:"Fresh sliced turkey breast, bacon, lettuce, tomato, & mayo."},
			{number:17, sandwich:"ULTIMATE PORKER", price:5.59, description:"Real applewood smoked ham and bacon with lettuce, tomato & mayo, what could be better!"}
		];
		
		$scope.addItem = function(item){
			$scope.invoice.items.push(
			{
				name: item.sandwich,
				qty: 1,
				cost: item.price
			});
		};

		$scope.removeItem = function(index) {
        	$scope.invoice.items.splice(index, 1);
    	};

		init();


		$scope.total = function() {
	        var total = 0;
	        angular.forEach($scope.invoice.items, function(item) {
	            total += item.qty * item.cost;
	        })

	        return total;
	    };

	}]);


