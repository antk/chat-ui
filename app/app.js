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

  $routeProvider.otherwise({redirectTo: '/list'});
}]).
filter('imgFilter', function() {
  return function(str) {
    return str.match(/<img\s.*\/>/) ? "<em>image attachment</em>" : str;
  };
}).filter('datetime', function() {
  // convert milliseconds to readable date
  return function(milliseconds) {
    var d = new Date(milliseconds);
    var h = d.getHours();
    var m = (d.getMinutes()+'').length === 1 ? '0'+d.getMinutes() : d.getMinutes();
    var h12 = h > 12 ? h - 12 : h;
    var ampm = h < 12 ? 'am' : 'pm';
    var date = (d.getMonth()+1) + '/' + (d.getDate()+1) + '/' + d.getFullYear();
    return date + ' - ' + h12 + ':' + m + ampm;
  };
})
