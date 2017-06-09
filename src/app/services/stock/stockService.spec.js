var angular = require('angular');
require('angular-mocks');
var {StockService} = require('./stockService');

describe('StockService service', function () {
  beforeEach(function () {
    angular
      .module('StockService', [])
      .service('StockService', StockService);
    angular.mock.module('StockService');
  });

  it('should', angular.mock.inject(function (StockService) {
    expect(StockService.getData()).toEqual(3);
  }));
});
