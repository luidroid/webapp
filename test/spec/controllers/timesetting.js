'use strict';

describe('Controller: TimesettingCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var TimesettingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TimesettingCtrl = $controller('TimesettingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
