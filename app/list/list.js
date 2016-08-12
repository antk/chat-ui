'use strict';

angular.module('chat.list', ['ngRoute', 'ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list/:id?', {
    templateUrl: 'list/list.html',
    controller: 'ListCtrl'
  });
}])

.controller('ListCtrl', ['$scope', '$routeParams', 'UserChatService', function($scope, $routeParams, UserChatService) {
  $scope.uid = $routeParams.id ? parseInt($routeParams.id, 10) : 0;
  $scope.userChats = [];
  $scope.pageClass = "animate-list";

  if(!isNaN($scope.uid)) {
    UserChatService.getDataForUser($scope.uid).then(function(data) {
      // construct a new chats array with lastDateTime to use angular's built in orderBy filter
      var newChatsArray = [];
      for(var i=0; i<data.chats.length; i++) {
        var obj = {lastDateTime: 0, chat: []};
        obj.lastDateTime = data.chats[i].messages[data.chats[i].messages.length-1].datetime;
        obj.chat = data.chats[i];
        newChatsArray.push(obj);
      }
      $scope.userChats = newChatsArray;
    });
  }

}]);