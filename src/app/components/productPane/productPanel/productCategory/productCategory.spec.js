var angular = require('angular');
require('angular-mocks');
var productCategory = require('./productCategory');

describe('productCategory component', function () {
  beforeEach(function () {
    angular
      .module('productCategory', ['app/components/productPane/productPanel/productCategory/productCategory.html'])
      .component('productCategory', productCategory);
    angular.mock.module('productCategory');
  });

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<productCategory></productCategory>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
