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
    // $scope.filteredContacts = [];
    $scope.filterContacts = function($event) {
      angular.element($event.target).bind('keydown', function(e) {
        if(e.keyCode === 13) { e.preventDefault(); }
      })
      if($event.keyCode === 13) {
        console.log('enter key');
      }
      $scope.searchText = $event.target.innerText;
      
    };
    UserChatService.getDataForUser($scope.uid).then(function(data) {
      $scope.contacts = data.user.contacts;
    });
  }

}]);