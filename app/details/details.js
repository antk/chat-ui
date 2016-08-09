'use strict';

angular.module('chat.details', ['ngRoute','ngAnimate', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/details/:uid/:id', {
    templateUrl: 'details/details.html',
    controller: 'DetailsCtrl'
  });
}])

.controller('DetailsCtrl', ['$scope', '$routeParams', 'DataService', 'UserChatService',
  function($scope, $routeParams, DataService, UserChatService) {
    $scope.pageClass = 'animate-details';
    $scope.chatId = parseInt($routeParams.id, 10);
    $scope.userId = parseInt($routeParams.uid, 10);
    if(!isNaN($scope.chatId) && !isNaN($scope.userId)) {
      $scope.messages = [];
      $scope.newMessage = '';
      $scope.pageTitle = ['.'];

      $scope.insertMessage = function(msg) {
        if(!msg) { // this is a new message
          var msgId = $scope.messages[$scope.messages.length-1].msg_id + 1;
          msg = {"msg_id":msgId, "sender_id":$scope.userId, "text":$scope.newMessage, "datetime":"", "last":true};
          UserChatService.addMessage($scope.chatId, msg);
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
        if(msg.text.length <= 0) return;
        $scope.messages.push(msg);
        $scope.newMessage = '';
        document.getElementById('msgEl').innerHTML = '';
      }

      $scope.setMessage = function($event) {
        $scope.newMessage = $event.target.innerText;
      };

      UserChatService.getDataForUser($scope.userId).then(function(data) {
        console.log(data);
        var theChat = {};

        // find the chat
        var i = data.chats.length - 1;
        do {
          if(data.chats[i].chat_id === $scope.chatId) {
            theChat = data.chats[i];
            break;
          }
        } while(i--);

        var theParticipants = [];
        var p = theChat.participants;
        for(var i=0; i<p.length; i++) {
          if(p[i].id !== $scope.userId) {
            theParticipants.push(p[i].firstName);
          }
        }
        $scope.participants = p;
        $scope.pageTitle = theParticipants;
        for(var i=0; i<theChat.messages.length; i++) {
          var msg = theChat.messages[i];
          msg.last = true;
          
          var prevMsg = i-1 > -1 ? prevMsg = theChat.messages[i-1] : null;
          var nextMsg = i+1 < theChat.messages.length ? theChat.messages[i+1] : null;
          if(nextMsg && nextMsg.sender_id === msg.sender_id) {
            msg.last = false;
          }
          $scope.insertMessage(msg);
        }
        // UserChatService.addMessage($scope.chatId, msg);
      });
    }
  }
]);