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
        templateUrl: 'partials/order.html',
        controller: 'OrderCtrl'
      }).
      when('/confirmation/:id', {
        templateUrl: 'partials/confirmation.html',
        controller: ''
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);