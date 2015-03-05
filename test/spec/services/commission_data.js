'use strict';

describe('Service: CommissionData', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var CommissionData;
  beforeEach(inject(function (_CommissionData_) {
    CommissionData = _CommissionData_;
  }));

  it('should do something', function () {
    expect(!!CommissionData).toBe(true);
  });

});
