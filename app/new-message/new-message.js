'use strict';

angular.module('chat.new', ['ngRoute', 'ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/new/:id?/:uid?', {
    templateUrl: 'details/details.html',
    controller: 'DetailsCtrl'
  });
}])

.controller('NewMsgCtrl', ['$scope', '$routeParams', 'UserChatService', function($scope, $routeParams, UserChatService) {
  $scope.uid = $routeParams.id ? parseInt($routeParams.id, 10) : 0;
  $scope.pageClass = "animate-new-msg";

  if(!isNaN($scope.uid)) {
    $scope.recipients = [];
    $scope.searchText = "";
    $scope.contactSearch = true;
    $scope.filterContacts = function($event) {
      angular.element($event.target).bind('keydown', function(e) {
        if(e.keyCode === 13) { e.preventDefault(); }
      })
      if($event.keyCode === 13) {
        console.log('enter key');
      }
      $scope.searchText = $event.target.innerText;
      
    };
    $scope.addToRecipients = function(contact) {
      $scope.searchText = '';
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
        $scope.recipients.push(contact);
      }
    };
    $scope.checkKey = function($event) {
      $scope.contactSearch = true;
      if($event.keyCode === 8) {
        if($scope.searchText.length <= 0) {
          $scope.recipients.splice($scope.recipients.length-1, 1);
        }
      }
    };
    UserChatService.getDataForUser($scope.uid).then(function(data) {
      $scope.userChats = data.chats;
      $scope.contacts = data.user.contacts;
    });
  }

}]);