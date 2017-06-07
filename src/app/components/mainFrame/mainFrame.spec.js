var angular = require('angular');
require('angular-mocks');
var mainFrame = require('./mainFrame');

describe('mainFrame component', function () {
  beforeEach(function () {
    angular
      .module('mainFrame', ['app/components/mainFrame/mainFrame.html'])
      .component('mainFrame', mainFrame);
    angular.mock.module('mainFrame');
  });

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<mainFrame></mainFrame>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
