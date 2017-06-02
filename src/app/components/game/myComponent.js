function myComponentController($window, $scope, $log) {
  this.text = 'My brand newmmmmmmmmmmmmmmmmmm component!';
  this.sayHello = function () {
    $window.alert('Say Hi');
  };
  $scope.$on('itemId', function (event, message) {
    $log.log(message);
  });
}

module.exports = {
  template: require('./myComponent.html'),
  controller: myComponentController
};