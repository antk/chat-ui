'use strict';

angular.module('chat.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list/:id?', {
    templateUrl: 'list/list.html',
    controller: 'ListCtrl'
  });
}])

.controller('ListCtrl', ['$scope', '$routeParams', 'DataService', function($scope, $routeParams, DataService) {
  var uid = $routeParams.id ? $routeParams.id : 0;
  $scope.userChats = [];

  // chain the requests because userData is needed
  DataService.getUsers().then(function(userData) {

    var getUserById = function(id) {
      var c = userData.length - 1;
      id = parseInt(id, 10);
      if(isNaN(id)) return;
      do {
        if(userData[c].id === id) {
          return userData[c];
        }
      } while(c--);
      return null;
    };

    DataService.getChats().then(function(chatData) {
      var chats = chatData;
      for(var i = 0; i < chats.length; i++) {
        var foundIdx = chats[i].participants.indexOf(uid);
        if(foundIdx >= 0) {
          // remove the user
          chats[i].participants.splice(foundIdx, 1);

          // replace participant id's with participant names
          var pIds = chats[i].participants;
          var pNames = [];
          for(var j = 0; j < pIds.length; j++) {
            pNames.push(getUserById(pIds[j]));
          }
          chats[i].participants = pNames;

          $scope.userChats.push(chats[i]);
        }
      } 
    });
  });

}]);