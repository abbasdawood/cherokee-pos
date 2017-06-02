var angular = require('angular');
require('angular-mocks');
var productNav = require('./productNav');

describe('productNav component', function () {
  beforeEach(function () {
    angular
      .module('productNav', ['app/components/productPane/productNav/productNav.html'])
      .component('productNav', productNav);
    angular.mock.module('productNav');
  });

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<productNav></productNav>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
