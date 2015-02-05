'use strict';

describe('Service: NetworkData', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var NetworkData;
  beforeEach(inject(function (_NetworkData_) {
    NetworkData = _NetworkData_;
  }));

  it('should do something', function () {
    expect(!!NetworkData).toBe(true);
  });

});
