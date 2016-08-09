'use strict';

angular.module('chat.new', ['ngRoute', 'ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/new/:id?', {
    templateUrl: 'new-message/new-message.html',
    controller: 'NewMsgCtrl'
  });
}])

.controller('NewMsgCtrl', ['$scope', '$routeParams', 'UserChatService', function($scope, $routeParams, UserChatService) {
  $scope.uid = $routeParams.id ? parseInt($routeParams.id, 10) : 0;
  $scope.pageClass = "animate-new-msg";

  if(!isNaN($scope.uid)) {
    UserChatService.getDataForUser($scope.uid).then(function(data) {
      
    });
  }

}]);