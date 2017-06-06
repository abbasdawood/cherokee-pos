var angular = require('angular');
require('angular-mocks');
var productCart = require('./productCart');

describe('productCart component', function () {
  beforeEach(function () {
    angular
      .module('productCart', ['app/components/productCart/productCart.html'])
      .component('productCart', productCart);
    angular.mock.module('productCart');
  });

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<productCart></productCart>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
