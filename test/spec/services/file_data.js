'use strict';

describe('Service: FileData', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var FileData;
  beforeEach(inject(function (_FileData_) {
    FileData = _FileData_;
  }));

  it('should do something', function () {
    expect(!!FileData).toBe(true);
  });

});
