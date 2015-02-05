'use strict';

describe('Controller: ComponentNewCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var ComponentNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComponentNewCtrl = $controller('ComponentNewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
