var angular = require('angular');
require('angular-mocks');
var sideNav = require('./sideNav');

describe('sideNav component', function () {
  beforeEach(function () {
    angular
      .module('sideNav', ['app/components/sideNav/sideNav.html'])
      .component('sideNav', sideNav);
    angular.mock.module('sideNav');
  });

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<sideNav></sideNav>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
