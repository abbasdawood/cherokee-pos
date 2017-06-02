var angular = require('angular');
require('angular-mocks');
var productPane = require('./productPane');

describe('productPane component', function () {
  beforeEach(function () {
    angular
      .module('productPane', ['app/components/productPane/productPane.html'])
      .component('productPane', productPane);
    angular.mock.module('productPane');
  });

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<productPane></productPane>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
