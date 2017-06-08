var angular = require('angular');
require('angular-mocks');
var {
  Auth - service
} = require('./authService');

describe('authService service', function () {
  beforeEach(function () {
    angular
      .module('AuthService', [])
      .service('AuthService', Auth - service);
    angular.mock.module('AuthService');
  });

  it('should', angular.mock.inject(function (AuthService) {
    expect(AuthService.getData()).toEqual(3);
  }));
});
