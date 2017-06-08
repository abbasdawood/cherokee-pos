function productCartController($scope, $log) {
  this.text = 'This is cart!';
  this.cart = [];
  var vm = this;
  var objfound = {};
  $scope.$on('itemObj', function (event, obj) {
    var id = obj.id;
    $log.log('recieved in cart ' + obj.id);
    var item = _.find(vm.cart, {id: obj.id});
    if (item) {
      item.qty++;
    } else {
      vm.cart.push({
        id: obj.id,
        name: obj.name,
        qty: 1
      });
    }
  });

  vm.cart = [1];
  $log.log(_.head(vm.cart));
}

module.exports = {
  template: require('./productCart.html'),
  controller: productCartController
};
