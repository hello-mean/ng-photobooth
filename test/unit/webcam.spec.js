'use strict';

describe('webcam', function() {
  beforeEach(module('hellomean.photobooth'));

  var camera,
      video = {},
      camFns = {
        success: function(arg) { },
        error: function(arg) { }
      };

  beforeEach(inject(function(webcam) {
    camera = webcam;
    navigator.getUserMedia = function(constraints, success, error)  { success('stream'); };
    window.URL = {
      createObjectURL: function(stream) { }
    };
  }));

  describe('#start()', function() {
    it("should should call navigator.getUserMedia with video and no audio", function() {
      spyOn(navigator, "getUserMedia");
      camera.start(video, "success");
      expect(navigator.getUserMedia.mostRecentCall.args[0]).toEqual({video: true, audio: false});
    });

    it("should set the video's src property to an object url on success", function() {
      spyOn(window.URL, 'createObjectURL').andReturn("source");
      camera.start(video, camFns.success);
      expect(window.URL.createObjectURL).toHaveBeenCalledWith("stream");
      expect(video.src).toBe("source");
    });
  });

});
