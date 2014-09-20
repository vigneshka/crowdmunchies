var cmControllers = angular.module('cmControllers', []);

cmControllers.controller('DropListCtrl', ['$scope', '$firebase',
	function ($scope, $firebase) {
		var ref = new Firebase("https://crowdwhat.firebaseio.com");
		$scope.drops = $firebase(ref).$asArray();
		$scope.numOrders = function(drop) {
			return (Object.keys(drop.order).length).toString();
		}
		$scope.dropDisc = function(drop) {
			var numOrders = Object.keys(drop.order).length;
			if (numOrders < 2)
			{
				return "None";
			}
			else if (numOrders>=2 && numOrders<5)
			{
				return "5% Discount!";
			}
			else if (numOrders>=5 && numOrders<10)
			{
				return "10% Discount!";
			}	
			else
			{
				return "20% Discount!";
			}

		}
		$scope.dropGoal = function(drop) {
			var numOrders = Object.keys(drop.order).length;
			if (numOrders < 2)
			{
				return (2 - numOrders).toString() + " from 5% Discount!";
			}
			else if (numOrders>=2 && numOrders<5)
			{
				return (5 - numOrders).toString() + " from 10% Discount!";
			}
			else if (numOrders>=5 && numOrders<10)
			{
				return (10 - numOrders).toString() + " from 20% Discount!";
			}	
			else
			{
				return "";
			}

		}
	}]);

cmControllers.controller('AdminCtrl', ['$scope', '$firebase',
	function ($scope, $firebase) {
		
		
		var ref = new Firebase("https://crowdwhat.firebaseio.com");
		$scope.drops = $firebase(ref).$asArray();

		$scope.numOrders = function(drop) {
			return (Object.keys(drop.order).length).toString();
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
		$scope.orderParse = function(drop) {
			var invoice = {};
			invoice.items = {};
			$scope.total = 0;
			invoice.total = 0;
			invoice.orderCount = Object.keys(drop.order).length;
			angular.forEach(drop.order, function(order) {
	            var splitArray = order.split(";");
	            for ( i=0; i<splitArray.length; i++) {
	            	var pairSplit = splitArray[i].split(",");
	            	
	            	var num = parseInt(pairSplit[0]);
	            	var qty = parseInt(pairSplit[1]);
	            	//check that the value is valid
	            	if (num > 0){
	            		var index = num -1;
	            		if (invoice.items[num] === undefined){
							invoice.items[num] =
							{
								number: num,
								name: $scope.menu[index].sandwich,
								qty: qty,
								cost: $scope.menu[index].price
							};	
						}
						else{
							invoice.items[num].qty += qty;
						}

	            	}

	            }

	        })

	        angular.forEach(invoice.items, function(item) {
	            invoice.total += item.qty * item.cost;
	        })
	        $scope.total = invoice.total;
	        return invoice;
		};

		$scope.discount = function(drop) {
			var numOrders = Object.keys(drop.order).length;
			if (numOrders < 2)
			{
				return 0;
			}
			else if (numOrders>=2 && numOrders<5)
			{
				return 0.05;
			}
			else if (numOrders>=5 && numOrders<10)
			{
				return 0.10;
			}	
			else
			{
				return 0.20;
			}

		}



	}]);
cmControllers.controller('OrderCtrl', ['$scope', '$routeParams', "$firebase", "$location",
	function ($scope, $routeParams, $firebase, $location) {

		var ref = new Firebase("https://crowdwhat.firebaseio.com");

		var init = function() {
			$scope.invoice = {};
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
			var fieldName = item.number.toString();
			if ($scope.invoice[fieldName] === undefined){
				$scope.invoice[fieldName] =
				{
					number: item.number,
					name: item.sandwich,
					qty: 1,
					cost: item.price
				};	
			}
			else{
				$scope.invoice[fieldName].qty += 1;
			}
			
		};

		$scope.removeItem = function(item) {
			var fieldName = item.number.toString();

        	delete $scope.invoice[fieldName];
    	};

		init();


		$scope.total = function() {
	        var total = 0;
	        angular.forEach($scope.invoice, function(item) {
	            total += item.qty * item.cost;
	        })

	        return total;
	    };

	    $scope.checkout = function(invoice) {
	    	
	    	var data = "";
	    	angular.forEach(invoice, function(item) {
	            data = data + item.number.toString() + "," + item.qty.toString() + ";";
	        })

	    	var randNum = Math.floor((Math.random() * 1000) + 1);
	    	var randString = randNum.toString();

	    	var building = ($routeParams.building).toString();
	    	var datetime = ($routeParams.datetime).toString();
	    	var buildingdate = building+datetime;

	    	var path = "#/confirmation/"+ building + "/" + datetime + "/" + randString;

	    	$location.path( path );
	    	

	

	    };

	}]);


