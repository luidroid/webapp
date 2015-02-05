'use strict';

describe('Service: LoginData', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var LoginData;
  beforeEach(inject(function (_LoginData_) {
    LoginData = _LoginData_;
  }));

  it('should do something', function () {
    expect(!!LoginData).toBe(true);
  });

});
