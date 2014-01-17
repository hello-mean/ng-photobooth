'use strict';
angular.module('ng-photobooth')
  .service('webcam', ['photobooth', function(photobooth) {
    return  {
      start: function(video, successFn, errorFn) {
        navigator.getUserMedia(
          {
            video: true,
            audio: false
          },
 
          function(stream) {
            video.src = window.URL.createObjectURL(stream);
            successFn(stream);
          },

          errorFn
        );
      },
      capture: function(video, canvas, type) {
        canvas.width = video.width;
        canvas.height = video.height;
        canvas.getContext('2d').drawImage(video, 0, 0);
        return photobooth.saveDataUrl(canvas.toDataURL(type));
      }
    };
  }])
  .run(function() {
    navigator.getUserMedia = navigator.getUserMedia ||
                             navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia ||
                             navigator.msGetUserMedia;
  });
