'use strict';

// Declare app level module which depends on views, and components
angular.module('chat', [
  'ngRoute',
  'ngAnimate',
  'chat.list',
  'chat.details'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/list'});
}]);
