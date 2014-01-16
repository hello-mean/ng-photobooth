'use strict';
angular.module('ng-photobooth')
  .directive('photoPreview', function() {
    return function(scope, elem) {
      scope.$on('photobooth:start', function() {
        elem.html('<video autoplay></video>' +
                  '<canvas></canvas>');
      });
    };
  });
