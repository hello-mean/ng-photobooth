'use strict';

describe('photo-button', function() {
  beforeEach(module('ng-photobooth'));

  var $compile,
      element,
      $scope;

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $scope = _$rootScope_;
    $compile = _$compile_;
  }));

  beforeEach(function() {
    var btn  = '<button type="button" photo-button start-class="starting">things</button>';
    element = $compile(btn)($scope);
  });

  it('should add class from start-class attribute on photobooth:cameraStart event', function() {
    $scope.$emit('photobooth:cameraStart');
    expect(element.hasClass('starting')).toBe(true);
  });

  it('should add a default start class if attribute not present', function() {
    var tpl = '<button type="button" photo-button>things</button>',
        element = $compile(tpl)($scope);
    $scope.$emit('photobooth:cameraStart');
    expect(element.hasClass('is-active')).toBe(true);
  });

  it('should set a camera property on the scope on photobooth:cameraStart event', function() {
    $scope.$emit('photobooth:cameraStart', {camera:true});
    expect($scope.camera).toBeDefined();
  });

  it('should remove the camera property from scope on photobooth:cameraStop event', function() {
    $scope.camera = {camera:true};
    $scope.$emit('photobooth:cameraStop');
    expect($scope.camera).toBeUndefined();
  });

  it('should remove the start-class from the button on photobooth:cameraStop event', function() {
    element.addClass('starting');
    $scope.$emit('photobooth:cameraStop');
    expect(element.hasClass('starting')).toBe(false);
  });

  it('should remove the default start-class on photobooth:cameraStop event', function() {
    var tpl = '<button type="button" photo-button>things</button>',
        element = $compile(tpl)($scope);
    element.addClass('is-active');
    $scope.$emit('photobooth:cameraStop');
    expect(element.hasClass('is-active')).toBe(false);
  });

  it('should trigger the photobooth:start event on click if camera not on scope', function() {
    $scope.camera = undefined;
    spyOn($scope, '$emit');
    element.click();
    expect($scope.$emit).toHaveBeenCalledWith('photobooth:start', $scope.camera);
  });

  it('should trigger the photobooth:capture event on click if camera in scope', function() {
    $scope.camera = {camera:true};
    spyOn($scope, '$emit');
    element.click();
    expect($scope.$emit).toHaveBeenCalledWith('photobooth:capture', $scope.camera);
  });
});
