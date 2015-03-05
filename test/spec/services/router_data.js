'use strict';

describe('Service: RouterData', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var RouterData;
  beforeEach(inject(function (_RouterData_) {
    RouterData = _RouterData_;
  }));

  it('should do something', function () {
    expect(!!RouterData).toBe(true);
  });

});
