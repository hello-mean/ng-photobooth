'use strict';
angular.module('ng-photobooth')
  .service('webcam', function() {
    return  {
      start: function(video, successFn) {
        navigator.getUserMedia(
          {
            video: true,
            audio: false
          },
 
          function(stream) {
            video.src = window.URL.createObjectURL(stream);
            successFn(stream);
          }
        );
      }
    };
  })
  .run(function() {
    navigator.getUserMedia = navigator.getUserMedia ||
                             navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia ||
                             navigator.msGetUserMedia;
  });
