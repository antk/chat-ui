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
      $scope.messages = [];
      $scope.newMessage = "";

      $scope.insertMessage = function(msg) {
        if(!msg) {
          console.log('here');
          var msgId = $scope.messages[$scope.messages.length-1].msg_id + 1;
          msg = {"msg_id":msgId, "sender_id":$scope.userId, "text":$scope.newMessage, "datetime":""}  
        }
        $scope.messages.push(msg);
        $scope.newMessage = "";
      }

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
        for(var i=0; i<data.chat.messages.length; i++) {
          $scope.insertMessage(data.chat.messages[i]);
        }
      }); 
    }
  }
]);