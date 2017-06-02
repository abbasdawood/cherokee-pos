var angular = require('angular');
require('angular-mocks');
var orderCard = require('./orderCard');

describe('orderCard component', function () {
  beforeEach(function () {
    angular
      .module('orderCard', ['app/components/orderPane/orderPanel/orderCard/orderCard.html'])
      .component('orderCard', orderCard);
    angular.mock.module('orderCard');
  });

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<orderCard></orderCard>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
