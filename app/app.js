'use strict';

// Declare app level module which depends on views, and components
angular.module('chat', [
  'ngRoute',
  'ngAnimate',
  'ngSanitize',
  'chat.list',
  'chat.details'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/list'});
}]).
filter('trustAsHtml', ['$sce', function($sce){
  return function(html){
    console.log(html);
    return $sce.trustAsHtml(html); 
  }
}])
