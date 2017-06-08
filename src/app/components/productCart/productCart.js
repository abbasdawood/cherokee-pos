function productCartController($scope, $log) {
  this.text = 'This is cart!';
  this.cart = [];
  var vm = this;
  var objfound = {};
  $scope.$on('itemObj', function (event, obj) {
    var id = obj.id;
    $log.log('recieved in cart ' + obj.id);

    if (vm.cart) {
      
    }
  });

  vm.cart = [1];
  $log.log(_.head(vm.cart));
}

module.exports = {
  template: require('./productCart.html'),
  controller: productCartController
};