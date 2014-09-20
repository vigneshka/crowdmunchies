var cmApp = angular.module('cmApp', ['ngRoute', 'cmControllers', 'firebase']);

cmApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/drop-list.html',
        controller: 'DropListCtrl'
      }).
      when('/join/:building/:restaurant/:datetime', {
      	templateUrl: 'partials/drop-join.html',
        controller: 'DropJoinCtrl'
      }).
      when('/order/:building/:restaurant/:datetime', {
        templateUrl: 'partials/drop-order.html',
        controller: 'OrderCtrl'
      }).
      when('/confirmation/:building/:datetime/:number', {
        templateUrl: 'partials/confirmation.html',
        controller: 'ConfirmationCtrl'
      }).
      when('/admin', {
        templateUrl: 'partials/admin.html',
        controller: 'AdminCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);


cmApp.filter('orderObjectBy', 
  function() {
  return function(input, attribute) {
    if (!angular.isObject(input)) 
      return input;

    var array = [];
    for (var objectKey in input) {
      array.push(input[objectKey]);
    }

    function compare(a, b) {
      if (a[attribute] < b[attribute])
        return -1;
      if (a[attribute] > b[attribute])
        return 1;
      return 0; 
    }

    array.sort(compare);
    return array;

  };

});