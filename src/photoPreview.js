'use strict';
angular.module('ng-photobooth')
  .directive('photoPreview', ['webcam', function(webcam) {
    return function(scope, elem, attrs) {
      function onCameraStart() {
        elem.addClass(attrs.cameraOnClass);
        scope.$emit('photobooth:cameraStart', elem.find('video')[0]);
      }

      function onCameraError(code) {
        scope.$emit('photobooth:cameraError', code);
      }

      scope.$on('photobooth:start', function() {
        elem.html('<video autoplay></video>' +
                  '<canvas></canvas>');
        webcam.start(elem.find('video')[0], onCameraStart, onCameraError);
      });
    };
  }]);
