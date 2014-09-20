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
			{number:1, sandwich:"Pepe", price:4.59, description:"Real applewood smoked ham and provolone cheese garnished with lettuce, tomato, and mayo."},
			{number:2, sandwich:"Pepe", price:4.59, description:"Real applewood smoked ham and provolone cheese garnished with lettuce, tomato, and mayo."},
			{number:3, sandwich:"Pepe", price:4.59, description:"Real applewood smoked ham and provolone cheese garnished with lettuce, tomato, and mayo."},
			{number:4, sandwich:"Pepe", price:4.59, description:"Real applewood smoked ham and provolone cheese garnished with lettuce, tomato, and mayo."},
			{number:5, sandwich:"Pepe", price:4.59, description:"Real applewood smoked ham and provolone cheese garnished with lettuce, tomato, and mayo."},
			{number:6, sandwich:"Pepe", price:4.59, description:"Real applewood smoked ham and provolone cheese garnished with lettuce, tomato, and mayo."},
			{number:7, sandwich:"Pepe", price:5.59, description:"Real applewood smoked ham and provolone cheese garnished with lettuce, tomato, and mayo."},
			{number:8, sandwich:"Pepe", price:5.59, description:"Real applewood smoked ham and provolone cheese garnished with lettuce, tomato, and mayo."},
			{number:9, sandwich:"Pepe", price:5.59, description:"Real applewood smoked ham and provolone cheese garnished with lettuce, tomato, and mayo."},
			{number:10, sandwich:"Pepe", price:5.59, description:"Real applewood smoked ham and provolone cheese garnished with lettuce, tomato, and mayo."},
			{number:11, sandwich:"Pepe", price:5.59, description:"Real applewood smoked ham and provolone cheese garnished with lettuce, tomato, and mayo."},
			{number:12, sandwich:"Pepe", price:5.59, description:"Real applewood smoked ham and provolone cheese garnished with lettuce, tomato, and mayo."},
			{number:13, sandwich:"Pepe", price:5.59, description:"Real applewood smoked ham and provolone cheese garnished with lettuce, tomato, and mayo."},
			{number:14, sandwich:"Pepe", price:5.59, description:"Real applewood smoked ham and provolone cheese garnished with lettuce, tomato, and mayo."},
			{number:15, sandwich:"Pepe", price:5.59, description:"Real applewood smoked ham and provolone cheese garnished with lettuce, tomato, and mayo."},
			{number:16, sandwich:"Pepe", price:5.59, description:"Real applewood smoked ham and provolone cheese garnished with lettuce, tomato, and mayo."},
			{number:17, sandwich:"Pepe", price:5.59, description:"Real applewood smoked ham and provolone cheese garnished with lettuce, tomato, and mayo."}
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


