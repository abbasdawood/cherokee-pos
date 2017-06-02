var angular = require('angular');
require('angular-mocks');
var orderNav = require('./orderNav');

describe('orderNav component', function () {
  beforeEach(function () {
    angular
      .module('orderNav', ['app/components/orderPane/orderNav/orderNav.html'])
      .component('orderNav', orderNav);
    angular.mock.module('orderNav');
  });

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<orderNav></orderNav>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
