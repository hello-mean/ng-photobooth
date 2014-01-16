'use strict';
angular.module('hellomean.photobooth')
  .directive('photoButton', function() {
    var defaultClass = 'is-active';

    return function(scope, elem, attrs) {
      /**
       * Either signal the camera to start or capture based on the state of the button
       */
      elem.bind('click', function() {
        scope.$emit((scope.camera) ? 'photobooth:capture' : 'photobooth:start', scope.camera);
      });

      /**
       * Change the state of the photo button when the camera starts
       */
      scope.$on('photobooth:cameraStart', function(e, camera) {
        scope.camera = camera;
        elem.addClass(attrs.startClass || defaultClass);
      });

      /**
       * Remove the video element and active button class
       */
      scope.$on('photobooth:cameraStop', function() {
        delete scope.camera;
        elem.removeClass(attrs.startClass || defaultClass);
      });
    };
  });
