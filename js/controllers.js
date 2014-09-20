var cmControllers = angular.module('cmControllers', []);

cmControllers.controller('DropListCtrl', ['$scope', 
	function ($scope) {

		$scope.drops = [
			{'location': 'ECEB',
			'orders': 9
			}
		];
}]);

cmControllers.controller('DropDetailCtrl', ['$scope', '$routeParams',
	function($scope, $routeParams) {
		$scope
	}]);