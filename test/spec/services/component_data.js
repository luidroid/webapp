'use strict';

describe('Service: componentData', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var componentData;
  beforeEach(inject(function (_componentData_) {
    componentData = _componentData_;
  }));

  it('should do something', function () {
    expect(!!componentData).toBe(true);
  });

});
