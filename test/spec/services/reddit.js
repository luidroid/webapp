'use strict';

describe('Service: Reddit', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var Reddit;
  beforeEach(inject(function (_Reddit_) {
    Reddit = _Reddit_;
  }));

  it('should do something', function () {
    expect(!!Reddit).toBe(true);
  });

});
