'use strict';

describe('photobooth', function() {

  var postSpy
    , postUrl = '/user/image'
    , dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAHgCAYAAAA10dzkAAAgAElEQVR4XnS96Y9t2XHld+58c3jze' +
                'zWSVdVFUSSLxeIgkWyR7EbDbasbcMMy7L9QbVhfBLT9wYA/NQRD+qDu1mBqoCiWSJY4FFms4dUbMvPO1+u3YkXWEyEfgniVmfe' +
                'es8/esSNWRKyIPXrtc589jifj4XiYDKPRaDguDv53t308HI/HYTSZDuPxeNiNz/37xfg4cB2PT4f9fjcM+/Nhu9sNk9Fy2O32w' +
                '3y+GqbT6XA1PfHnpjvdk/sclsPhsB+mw94/H3ZT3299utK/42F22Ax7/X0xndX9h7X/PtodhsPxoDHc9Pemx9v+d67P8/fHk6thp' +
                '3EcRgt/7+S4zbhH/nk7WdR7bU/9/Mn4YhhPJsNkMhumerfZceXv6wX9uc18WuM+XPnnYbwatlvdX9/hmh1mGudh2B8nw5jxjW/oX' +
                'pNhud/o/fW5w1k9b7L1ex1Hj/3zeH7Qs8fDY313PNa9phe+33h0OqxWq+HWhvnVPMzGusdhuNqd6D30nekjrc1R36/1mBwXnufL' +
                '+YnHP97W/I4nc/1/PGjBPL755mOvw0j3P+jv+8Pgfyfjer/joebnOB75edPJyt/f6b08v/r9fr9nhLX+mi/Py37tzy/3p/75alb3' +
                'O4x2fs+5xsZz9Oga/1pzpN9PNC8ex82nnu8jn9cztocTjUmyxzg0yKnWg2uk8TJPh+3U769vDjPJxnqxzjxs/bm51o3xjEYav56' +
                'z3d/y348aAPNzpTFwTcZaN73PdDSzHOzHT7K+d/zvQfNo+Z58XPN5kKTqczPNSd2/5B754Of5Xu+j8c413gPzNFv6ewvNF/fZHz' +
                '/W8/TsKfM3Gdbz85p//W+9XmsfLGp+ljWfk13NJ+vCXEwkN1zbrNN0uracPTmelDxpP7HO7Buu/Yhx7YelRNlyvKx9sNvXvggg=='
    , stripped = dataUrl.substring(22);

  beforeEach(module('ng-photobooth'));

  beforeEach(module(function(photoboothProvider){
    photoboothProvider.setPostUrl(postUrl);
  }));

  describe('#saveDataUrl()', function() {

    it('should strip out non-base64 content and post image and ext to configured url', inject(function(photobooth, $http) {
      postSpy = spyOn($http, 'post');
      photobooth.saveDataUrl(dataUrl);
      expect(postSpy).toHaveBeenCalled();
      expect(postSpy.mostRecentCall.args[0]).toEqual(postUrl);
      expect(postSpy.mostRecentCall.args[1]).toEqual({image:stripped, ext:'png'});
    }));

    it('should throw an error if mime type is not image', inject(function(photobooth) {
      var data = 'data:image/lazorbeams;base64, ivBOR'
        , fn = _.partial(photobooth.saveDataUrl, data);
      expect(fn).toThrow(new Error("Cannot save non-image data"));
    }));

  });

});
