var angular = require('angular');
require('angular-mocks');
var orderNew = require('./orderNew');

describe('orderNew component', function () {
  beforeEach(function () {
    angular
      .module('orderNew', ['app/components/orderPane/orderNew/orderNew.html'])
      .component('orderNew', orderNew);
    angular.mock.module('orderNew');
  });

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<orderNew></orderNew>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
