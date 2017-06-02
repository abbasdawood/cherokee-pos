var angular = require('angular');
require('angular-mocks');
var orderPanel = require('./orderPanel');

describe('orderPanel component', function () {
  beforeEach(function () {
    angular
      .module('orderPanel', ['app/components/orderPane/orderPanel/orderPanel.html'])
      .component('orderPanel', orderPanel);
    angular.mock.module('orderPanel');
  });

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<orderPanel></orderPanel>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
