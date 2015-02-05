'use strict';

describe('Service: eventData', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var eventData;
  beforeEach(inject(function (_eventData_) {
    eventData = _eventData_;
  }));

  it('should do something', function () {
    expect(!!eventData).toBe(true);
  });

});
