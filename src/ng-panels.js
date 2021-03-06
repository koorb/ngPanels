(function(){
  'use strict';

  angular.module('ngPanels', [])

    .directive('panelView', function() {
      return {
        restrict: 'EA',
        transclude: true,
        template: '<div ng-transclude></div><div class="ng-panel-mask" ng-click="panelOptions.unmask()" ng-if="panelOptions.masked"></div>',
        scope: {
          panelOptions: '=',
          path: '='
        },
        controller: function($scope, $element, $attrs) {
          $element.addClass('ng-panel-view');

          if (!$element.hasClass('panel-static')) {
            $scope.$watch('panelOptions.active', function (isActive, wasActive) {
              if (isActive) {
                $element.addClass('active');
              } else {
                $element.removeClass('active');
              }
            });
          }

          $scope.$watch('panelOptions.masked', function (isMasked, wasMasked) {
            if (isMasked) {
              $element.addClass('masked');
              if ($element.css('right') !== 'auto' && !$element.hasClass('panel-static')) {
                var x = $element.parent()[0].offsetWidth;
                $element.css('transform', 'translate3d(-'+x+'px, 0, 0)');
                $element.css('-webkit-transform', 'translate3d(-'+x+'px, 0, 0)');
                $element.css('-moz-transform', 'translate3d(-'+x+'px, 0, 0)');
              }
            } else {
              $element.removeClass('masked');
              $element.css('transform', '');
              $element.css('-webkit-transform', '');
              $element.css('-moz-transform', '');
            }
          });
        }
      };
    });
})();
