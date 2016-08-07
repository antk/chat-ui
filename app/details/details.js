'use strict';

angular.module('chat.details', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/details/:uid/:id', {
    templateUrl: 'details/details.html',
    controller: 'DetailsCtrl'
  });
}])

.controller('DetailsCtrl', ['$scope', '$routeParams', 'DataService',
  function($scope, $routeParams, DataService) {
    $scope.chatId = parseInt($routeParams.id, 10);
    $scope.userId = parseInt($routeParams.uid, 10);
    if(!isNaN($scope.chatId) && !isNaN($scope.userId)) {
      DataService.getChatById($scope.chatId).then(function(data) {
        console.log(data);
        var theParticipants = [];
        var p = data.chat.participants;
        for(var i=0; i<p.length; i++) {
          if(p[i].id !== $scope.userId) {
            theParticipants.push(p[i].firstName);
          }
        }
        $scope.participants = theParticipants.join(', ');
        $scope.messages = data.chat.messages;
      }); 
    }
  }
]);