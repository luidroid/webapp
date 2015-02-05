'use strict';

describe('Controller: ComponentListCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var ComponentListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComponentListCtrl = $controller('ComponentListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
