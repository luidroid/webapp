'use strict';

describe('Controller: ComponentDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var ComponentDetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComponentDetailsCtrl = $controller('ComponentDetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
