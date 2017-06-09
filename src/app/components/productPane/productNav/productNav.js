function productNavController($rootScope) {
  this.text = 'My brand new component!';
  var vm = this;

  this.categories = [];
  // angular.forEach(jsonobj, function (element) {
  //   vm.categories.push(element.category);
  // });
  // this.showCategory = function (category) {
  //   $rootScope.$broadcast('showCategory', category);
  // };
}

module.exports = {
  template: require('./productNav.html'),
  controller: productNavController
};