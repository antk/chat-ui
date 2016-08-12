'use strict';

// Declare app level module which depends on views, and components
angular.module('chat', [
  'ngRoute',
  'ngAnimate',
  'ngSanitize',
  'chat.list',
  'chat.details',
  'chat.new'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/list/0'});
}])
