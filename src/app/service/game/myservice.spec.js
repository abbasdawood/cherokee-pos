var angular = require('angular');
require('angular-mocks');
var {Myservice} = require('./myservice');

describe('Myservice service', function () {
  beforeEach(function () {
    angular
      .module('Myservice', [])
      .service('Myservice', Myservice);
    angular.mock.module('Myservice');
  });

  it('should', angular.mock.inject(function (Myservice) {
    expect(Myservice.getData()).toEqual(3);
  }));
});
