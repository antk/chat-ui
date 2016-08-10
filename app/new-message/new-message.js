'use strict';

angular.module('chat.new', ['ngRoute', 'ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/new/:id?/:uid?', {
    templateUrl: 'details/details.html',
    controller: 'DetailsCtrl'
  });
}])