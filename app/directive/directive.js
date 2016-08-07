'use strict';

angular.module('chat')

.directive('sectionHeader', function() {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'template/section-header.html',
    link: function($scope, $element, $attrs) {
      $scope.sectionType = $attrs.type;
      $scope.sectionTitle = $attrs.title;
    }
  };
});