function myComponentController($window) {
  this.text = 'My brand newmmmmmmmmmmmmmmmmmm component!';

  this.sayHello = function () {
    $window.alert('Say Hi');
  };
}

module.exports = {
  template: require('./myComponent.html'),
  controller: myComponentController
};