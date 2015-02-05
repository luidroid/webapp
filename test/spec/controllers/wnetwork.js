'use strict';

describe('Controller: WnetworkCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var WnetworkCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WnetworkCtrl = $controller('WnetworkCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
