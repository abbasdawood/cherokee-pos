var angular = require('angular');
require('angular-mocks');
var {CommonService} = require('./commonService');

describe('CommonService service', function () {
  beforeEach(function () {
    angular
      .module('CommonService', [])
      .service('CommonService', CommonService);
    angular.mock.module('CommonService');
  });

  it('should', angular.mock.inject(function (CommonService) {
    expect(CommonService.getData()).toEqual(3);
  }));
});
