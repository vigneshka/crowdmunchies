var cmApp = angular.module('cmApp', ['ngRoute', 'cmControllers', 'firebase']);

cmApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/drop-list.html',
        controller: 'DropListCtrl'
      }).
      when('/status/:building/:restaurant/:datetime', {
        templateUrl: 'partials/drop-status.html',
        controller: 'DropDetailCtrl'
      }).
      when('/join/:building/:restaurant/:datetime', {
      	templateUrl: 'partials/drop-join.html',
        controller: 'DropJoinCtrl'
      }).
      when('/order/:building/:restaurant/:datetime', {
        templateUrl: 'partials/drop-order.html',
        controller: 'OrderCtrl'
      }).
      when('/confirmation/:id', {
        templateUrl: 'partials/confirmation.html',
        controller: ''
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