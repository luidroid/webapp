'use strict';

describe('Service: Timesetting', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var Timesetting;
  beforeEach(inject(function (_Timesetting_) {
    Timesetting = _Timesetting_;
  }));

  it('should do something', function () {
    expect(!!Timesetting).toBe(true);
  });

});
