'use strict';

angular.module('chat.details', ['ngRoute','ngAnimate', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/details/:uid/:id', {
    templateUrl: 'details/details.html',
    controller: 'DetailsCtrl'
  });
}])

.controller('DetailsCtrl', ['$scope', '$routeParams', 'UserChatService',
  function($scope, $routeParams, UserChatService) {
    $scope.pageClass = 'animate-details';
    $scope.chatId = parseInt($routeParams.id, 10);
    $scope.userId = parseInt($routeParams.uid, 10);
    $scope.theSectionType = 'chatDetail';
    $scope.pageTitle = ['.'];
    $scope.findChat = true;

    // set some parameters for new message
    $scope.newChat = $scope.chatId === -1 ? true : false;
    if($scope.newChat) {
      $scope.pageClass = 'animate-new-msg';
      $scope.theSectionType = 'new';
      $scope.pageTitle = ['New Message'];
      $scope.recipients = [];
      $scope.searchText = '';
      $scope.contactSearch = true;
      $scope.findChat = false;
    }

    console.log('chatId: ' + $scope.chatId + ', userId: ' + $scope.userId);

    if(!isNaN($scope.chatId) && !isNaN($scope.userId)) {
      $scope.messages = [];
      $scope.newMessage = '';

      $scope.insertMessage = function(msg, isNewMsg) {
        if(isNewMsg) { // this is a new message, construct the message object to be added to this chat
          var msg = {};
          var msgId = 0;
          if($scope.messages.length === 0) {
            // this is a new chat, construct a new chat object for this user
            $scope.pageTitle = [];
            var chat = {chat_id: -1, messages:[], participants: $scope.recipients};
            for(var i=0; i<$scope.recipients.length; i++) {
              $scope.pageTitle.push($scope.recipients[i].firstName);
            }
            // add the new chat to the user's chats and set $scope.chatId
            $scope.chatId = UserChatService.addChat(chat);
          }
          else { // this is not a new chat, get a new message id to insert into the existing chat with $scope.chatId
            msgId = $scope.messages[$scope.messages.length-1].msg_id+1;
          }
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
        if(isNewMsg) {
          $scope.newChat = false;
          $scope.theSectionType = 'chatDetail';
        }
      }

      var shiftDown = false;

      $scope.setMessage = function($event) {
        $scope.newMessage = $event.target.innerText;
        shiftDown = false;
      };
      
      $scope.checkForShiftEnter = function($event) {
        if($event.keyCode === 16) {
          shiftDown = true;
        }
        if(shiftDown) {
          if($event.keyCode === 13) {
            $event.preventDefault();
            $scope.insertMessage($scope.userId, true);
          }
        }
      };

      $scope.addToRecipients = function(contact) {
        $scope.searchText = '';
        document.getElementById('contactSearchField').value = '';
        document.getElementById('contactSearchField').focus();
        var recipientExists = false;
        var i = $scope.recipients.length - 1;
        do {
          if(i < 0) break;
          if($scope.recipients[i].id === contact.id) {
            recipientExists = true;
            break;
          }
        } while(i--);
        if(!recipientExists) {
          $scope.contactSearch = false;
          $scope.recipients.push(contact);
          
          // get the existing chat if the chat with recipient exists
          // go through each of the chats, then each of the participants
          var j = $scope.chats.length - 1;
          var foundChat = null;
          do {
            var aChat = $scope.chats[j];
            var recipientInChat = false;
            // only look at chats where the number of participants is the same as number of recipients
            if(aChat.participants.length === $scope.recipients.length) {
              var pIdArray = [];
              for(var n = 0; n<aChat.participants.length; n++) {
                pIdArray.push(aChat.participants[n].id);
              }
              for(var m = 0; m<$scope.recipients.length; m++) {
                // console.log($scope.recipients[m].id);
                if(pIdArray.indexOf($scope.recipients[m].id) < 0) {
                  recipientInChat = false;
                  break;
                }
                else {
                  recipientInChat = true;
                }
              }
              if(recipientInChat) {
                foundChat = aChat;
                break;
              }
            }
          } while(j--);

          if(foundChat) {
            $scope.chatId = foundChat.chat_id;
            chatDetails(foundChat.chat_id);
          }
          else {
            $scope.messages = [];
          }
        }
      };

      $scope.checkKey = function($event) {
        $scope.contactSearch = true;

        if($event.keyCode === 8) {
          if($scope.searchText.length <= 0) {
            $scope.recipients.splice($scope.recipients.length-1, 1);
            $scope.messages = [];
          }
        }
      };

      var chatDetails = function(chatId) {
        var theChat = {};
        var theChats = $scope.chats;
        var i = theChats.length - 1;
        do {
          if(theChats[i].chat_id === chatId) {
            theChat = theChats[i];
            break;
          }
        } while(i--);

        // set the page title to the participant names
        var theParticipants = [];
        var p = theChat.participants;
        for(var i=0; i<p.length; i++) {
          if(p[i].id !== $scope.userId) {
            theParticipants.push(p[i].firstName);
          }
        }
        $scope.participants = p;
        $scope.pageTitle = theParticipants;

        // display the messages for this chat
        for(var i=0; i<theChat.messages.length; i++) {
          var msg = theChat.messages[i];
          msg.last = true;
          
          // look at the next msg
          var nextMsg = i+1 < theChat.messages.length ? theChat.messages[i+1] : null;
          if(nextMsg && nextMsg.sender_id === msg.sender_id) {
            msg.last = false;
          }
          $scope.insertMessage(msg);
        }
      }

      UserChatService.getDataForUser($scope.userId).then(function(data) {
        console.log(data);
        $scope.chats = data.chats;
        var theChat = {};

        if($scope.newChat) {
          // console.log(data.user.contacts);
          $scope.contacts = data.user.contacts;
        }
        else {
          chatDetails($scope.chatId);
        }
      });
    }
  }
]);