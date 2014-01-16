'use strict';

describe('photo-preview', function() {
  beforeEach(module('ng-photobooth'));

  var $compile,
      element,
      $scope;

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $scope = _$rootScope_;
    $compile = _$compile_;
  }));

  beforeEach(function() {
    var prev  = '<div photo-preview recording-class></div>';
    element = $compile(prev)($scope);
  });

  it("should replace element html with video and canvas on photobooth:start event", function() {
    $scope.$emit('photobooth:start');
    var video = element.find('video'),
        canvas = element.find('canvas');
    expect(video.length).toBe(1);
    expect(canvas.length).toBe(1);
  });

});
