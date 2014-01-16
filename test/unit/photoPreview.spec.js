'use strict';

describe('photo-preview', function() {
  beforeEach(module('ng-photobooth'));

  var $compile,
      element,
      camera,
      $scope;

  beforeEach(inject(function(_$rootScope_, _$compile_, webcam) {
    $scope = _$rootScope_;
    $compile = _$compile_;
    camera = webcam;
    window.URL = { createObjectURL: function(str) { return "stream";  }};
    navigator.getUserMedia = function(c, s, e) { s(); };
  }));

  beforeEach(function() {
    var prev  = '<div photo-preview camera-on-class="is-on"></div>';
    element = $compile(prev)($scope);
  });

  it("should replace element html with video and canvas on photobooth:start event", function() {
    $scope.$emit('photobooth:start');
    var video = element.find('video'),
        canvas = element.find('canvas');
    expect(video.length).toBe(1);
    expect(canvas.length).toBe(1);
  });

  it("should place the autoplay attribute on the video on photobooth:start event", function() {
    $scope.$emit('photobooth:start');
    var video = element.find('video');
    expect(video.attr('autoplay')).toBeTruthy();
  });

  it("should call webcam.start on photobooth:start", function() {
    spyOn(camera, "start");
    $scope.$emit('photobooth:start');
    expect(camera.start).toHaveBeenCalled();
  });

  it("should set the element class to the camera-on-class attr on photobooth:start", function() {
    $scope.$emit('photobooth:start');
    expect(element.hasClass('is-on')).toBe(true);
  });

  it("should emit a photobooth:cameraStart event with the video when the camera starts", function() {
    spyOn($scope, '$emit').andCallThrough();
    $scope.$emit('photobooth:start');
    expect($scope.$emit.mostRecentCall.args[0]).toBe('photobooth:cameraStart');
    expect($scope.$emit.mostRecentCall.args[1][0]).toEqual(element.find('video')[0]);
  });

  it("should trigger the photobooth:cameraError event when there is a camera error", function() {
    spyOn(camera, 'start').andCallFake(function(v, s, e) { e('error'); });
    spyOn($scope, '$emit').andCallThrough();
    $scope.$emit('photobooth:start');
    expect($scope.$emit.mostRecentCall.args[0]).toBe('photobooth:cameraError');
    expect($scope.$emit.mostRecentCall.args[1]).toBe('error');
  });
});
