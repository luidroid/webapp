'use strict';

describe('Service: certificateData', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var certificateData;
  beforeEach(inject(function (_certificateData_) {
    certificateData = _certificateData_;
  }));

  it('should do something', function () {
    expect(!!certificateData).toBe(true);
  });

});
