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
      $scope.pageTitle = ["."];

      $scope.insertMessage = function(msg) {
        if(!msg) {
          var msgId = $scope.messages[$scope.messages.length-1].msg_id + 1;
          msg = {"msg_id":msgId, "sender_id":$scope.userId, "text":$scope.newMessage, "datetime":"", "last":true};
        }
        var lastMsg = $scope.messages[$scope.messages.length-1];
        if(lastMsg && lastMsg.sender_id == msg.sender_id) {
          $scope.messages[$scope.messages.length-1].last = false;
        }

        // get the participant name and append to msg
        if($scope.participants) {
          var i = $scope.participants.length - 1;
          do {
            var p = $scope.participants[i];
            if(p.id === msg.sender_id) {
              msg.senderFirst = p.firstName;
              msg.senderLast = p.lastName;
              break;
            }
          } while(i--);
        }

        console.log(msg);
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
        $scope.participants = p;
        $scope.pageTitle = theParticipants;
        for(var i=0; i<data.chat.messages.length; i++) {
          var msg = data.chat.messages[i];
          msg.last = true;
          
          var prevMsg = i-1 > -1 ? prevMsg = data.chat.messages[i-1] : null;
          var nextMsg = i+1 < data.chat.messages.length ? data.chat.messages[i+1] : null;
          if(nextMsg && nextMsg.sender_id === msg.sender_id) {
            msg.last = false;
          }


          $scope.insertMessage(msg);
        }
      }); 
    }
  }
]);