'use strict';

describe('webcam', function() {
  beforeEach(module('ng-photobooth'));

  var camera,
      booth,
      video = {width:200, height:100},
      camFns = {
        success: function(arg) { },
        error: function(arg) { }
      };

  beforeEach(inject(function(webcam, photobooth) {
    camera = webcam;
    booth = photobooth;
    navigator.getUserMedia = function(constraints, success, error)  { success('stream'); };
    window.URL = {
      createObjectURL: function(stream) { }
    };
  }));

  describe('#start()', function() {
    it("should should call navigator.getUserMedia with video and no audio", function() {
      spyOn(navigator, "getUserMedia");
      camera.start(video, camFns.success);
      expect(navigator.getUserMedia.mostRecentCall.args[0]).toEqual({video: true, audio: false});
    });

    it("should set the video's src property to an object url on success", function() {
      spyOn(window.URL, 'createObjectURL').andReturn("source");
      camera.start(video, camFns.success);
      expect(window.URL.createObjectURL).toHaveBeenCalledWith("stream");
      expect(video.src).toBe("source");
    });

    it("should call error the error handler when getUserMedia has error", function() {
      spyOn(camFns, "error");
      navigator.getUserMedia = function(c, s, e) { e('error'); };
      camera.start(video, camFns.success, camFns.error);
      expect(camFns.error).toHaveBeenCalledWith("error");
    });
  });

  describe('#capture()', function() {
    var canvas,
        context;

    beforeEach(function() {
      spyOn(booth, 'saveDataUrl');
      context = {
        drawImage: function(video, x, y) {}
      };
      canvas = {
        getContext: function(any) {
          return context;
        },
        toDataURL: function(format) {
        },
      };
    });

    it("should set canvas dimensions to the videos dimension", function() {
      camera.capture(video, canvas, 'image/png');
      expect(canvas.width).toEqual(video.width);
      expect(canvas.height).toEqual(video.height);
    });    

    it('should call the 2d contexts drawImage method with video', function() {
      spyOn(context, 'drawImage');
      camera.capture(video, canvas, 'image/png');
      expect(context.drawImage).toHaveBeenCalledWith(video, 0, 0);
    });

    it('should send the data url of the given type to photobooth#saveDataUrl', function() {
      spyOn(canvas, 'toDataURL').andReturn('such data');
      camera.capture(video, canvas, 'image/png');
      expect(booth.saveDataUrl).toHaveBeenCalledWith('such data');
      expect(canvas.toDataURL).toHaveBeenCalledWith('image/png');
    });
  });

});
