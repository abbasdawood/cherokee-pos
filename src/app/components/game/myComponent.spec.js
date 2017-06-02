var angular = require('angular');
require('angular-mocks');
var myComponent = require('./myComponent');

describe('myComponent component', function () {
  beforeEach(function () {
    angular
      .module('myComponent', ['app/components/game/myComponent.html'])
      .component('myComponent', myComponent);
    angular.mock.module('myComponent');
  });

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<myComponent></myComponent>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
