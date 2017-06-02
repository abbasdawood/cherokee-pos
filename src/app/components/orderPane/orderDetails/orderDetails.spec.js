var angular = require('angular');
require('angular-mocks');
var orderDetails = require('./orderDetails');

describe('orderDetails component', function () {
  beforeEach(function () {
    angular
      .module('orderDetails', ['app/components/orderPane/orderDetails/orderDetails.html'])
      .component('orderDetails', orderDetails);
    angular.mock.module('orderDetails');
  });

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<orderDetails></orderDetails>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
