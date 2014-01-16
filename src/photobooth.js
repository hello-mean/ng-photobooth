'use strict';
angular.module('ng-photobooth', [])
  .provider('photobooth', function() {
    var postUrl,
        pattern = /^data:image\/(png|gif|jpe?g);base64,(.*)$/;

    this.setPostUrl = function(url) {
      postUrl = url;
    };

    this.$get = ['$http', function($http) {
      return {
        saveDataUrl: function(dataUrl) {
          var matches = dataUrl.match(pattern);
          if (! matches) {
            throw new Error('Cannot save non-image data');
          }
          return $http.post(postUrl, {image: matches[2], ext: matches[1]});
        }
      };
    }];
  });
