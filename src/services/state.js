'use strict';

angular.module('ng-kiosk.services')
  .factory('State', function() {
    var states = [
      'is-initializing',
      'is-ready',
      'is-error'
    ];
    return function(elem, scope) {
      this.set = function(state) {
        angular.forEach(states, elem.removeClass, elem);
        elem.addClass(state);
        scope.$broadcast('kiosk:' + state);
        scope.$emit('kiosk:' + state);
      };
    };
  });
