var cmApp = angular.module('cmApp', ['ngRoute', 'cmControllers']);

cmApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/drops', {
        templateUrl: 'partials/drop-list.html',
        controller: 'DropListCtrl'
      }).
      when('/drops/:dropId', {
        templateUrl: 'partials/drop-detail.html',
        controller: 'DropDetailCtrl'
      }).
      otherwise({
        redirectTo: '/drops'
      });
  }]);