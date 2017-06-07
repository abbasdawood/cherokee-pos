var angular = require('angular');
require('angular-mocks');
var login = require('./login');

describe('login component', function () {
  beforeEach(function () {
    angular
      .module('login', ['app/components/login/login.html'])
      .component('login', login);
    angular.mock.module('login');
  });

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<login></login>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
