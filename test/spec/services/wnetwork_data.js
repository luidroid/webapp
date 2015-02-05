'use strict';

describe('Service: wnetworkData', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var wnetworkData;
  beforeEach(inject(function (_wnetworkData_) {
    wnetworkData = _wnetworkData_;
  }));

  it('should do something', function () {
    expect(!!wnetworkData).toBe(true);
  });

});
