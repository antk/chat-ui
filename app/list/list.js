'use strict';

angular.module('chat.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list/:id?', {
    templateUrl: 'list/list.html',
    controller: 'ListCtrl'
  });
}])

.controller('ListCtrl', ['$scope', '$routeParams', 'DataService', function($scope, $routeParams, DataService) {
  $scope.uid = $routeParams.id ? parseInt($routeParams.id, 10) : 0;
  $scope.userChats = [];

  if(!isNaN($scope.uid)) {
    DataService.getChatsByUserId($scope.uid).then(function(data) {
      $scope.userChats = data.chats;
    })
  }

}]);