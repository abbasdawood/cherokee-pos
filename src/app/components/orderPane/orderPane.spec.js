var angular = require('angular');
require('angular-mocks');
var orderPane = require('./orderPane');

describe('orderPane component', function () {
  beforeEach(function () {
    angular
      .module('orderPane', ['app/components/orderPane/orderPane.html'])
      .component('orderPane', orderPane);
    angular.mock.module('orderPane');
  });

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<orderPane></orderPane>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
