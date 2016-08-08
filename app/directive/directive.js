'use strict';

angular.module('chat')

.directive('setHeight', ['$window', function($window) {
  return {
    link: function($scope, $element, $attrs) {
      angular.element(document).ready(function() {
        var headerHeight = document.getElementById('header') ? document.getElementById('header').offsetHeight : 0;
        var footerHeight = document.getElementById('footer') ? document.getElementById('footer').offsetHeight : 0;
        var windowHeight = $window.innerHeight;
        console.log(windowHeight);
        console.log(headerHeight);
        console.log(footerHeight);
        var theHeight = windowHeight - headerHeight - footerHeight;
        $element.css('height', theHeight + 'px');
      })

    }
  }
}])

.directive('sectionHeader', function() {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'template/section-header.html',
    link: function($scope, $element, $attrs) {
      $scope.sectionType = $attrs.type;
      $scope.sectionTitle = $attrs.title;
      $scope.$watch('pageTitle', function(newValue, oldValue) {
        if(newValue) {
          $scope.sectionTitle = newValue.join(', ');
        }
      })
    }
  };
})