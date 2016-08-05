'use strict';

angular.module('chat.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list/:id', {
    templateUrl: 'list/list.html',
    controller: 'ListCtrl'
  });
}])

.controller('ListCtrl', ['$routeParams', 'DataService', function($routeParams, DataService) {
  var uid = $routeParams.id;
  console.log(uid);
  console.log(DataService.getData(uid));
}]);