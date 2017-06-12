var angular = require('angular');
require('angular-mocks');
var {
  OrderService
} = require('./orderService');

describe('OrderService service', function () {
  beforeEach(function () {
    angular
      .module('OrderService', [])
      .service('OrderService', OrderService);
    angular.mock.module('OrderService');
  });

  it('should', angular.mock.inject(function (OrderService) {
    expect(OrderService.getData()).toEqual(3);
  }));
});