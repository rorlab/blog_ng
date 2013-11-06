'use strict';

describe('Service: postsFactory', function () {

  // load the service's module
  beforeEach(module('blogNgApp'));

  // instantiate service
  var postsFactory;
  beforeEach(inject(function (_postsFactory_) {
    postsFactory = _postsFactory_;
  }));

  it('should do something', function () {
    expect(!!postsFactory).toBe(true);
  });

});
