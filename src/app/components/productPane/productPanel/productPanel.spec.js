var angular = require('angular');
require('angular-mocks');
var productPanel = require('./productPanel');

describe('productPanel component', function () {
  beforeEach(function () {
    angular
      .module('productPanel', ['app/components/productPane/productPanel/productPanel.html'])
      .component('productPanel', productPanel);
    angular.mock.module('productPanel');
  });

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<productPanel></productPanel>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
