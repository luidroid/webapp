'use strict';

describe('Controller: ComponentEditCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var ComponentEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComponentEditCtrl = $controller('ComponentEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
