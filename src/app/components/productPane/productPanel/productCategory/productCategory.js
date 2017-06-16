var localforage = require('localforage');

function productCategoryController($scope, $log, StockService) {
  var vm = this;
  this.products = [];
  this.cart = [];
  this.cartCount = 0;
  // $scope.names = [];

  this.getProducts = function () {
    var some = [];
    $log.log('function getProducts is called ');
    localforage
      .iterate(function (value, key, iterationNumber) {
        // $log.log(value.name);
        // body...
        vm.products.push(value);
        // vm.products[iterationNumber] = value;
        $scope.$apply();
      })
      .then(function (data) {
        // $log.log(vm.products);
        // body...
        // $scope.products.push(data);
      })
      .catch(function (error) {
        $log.log(error);
      });
  };

  this.getProducts();

  this.cartProducts = function (cartProduct) {
    var item = _.find(vm.cart, { id: cartProduct.id });
    if (item) {
      item.qty++;
    } else {
      vm.cart.push({
        id: cartProduct.id,
        name: cartProduct.name,
        qty: 1
      });
      vm.cartCount++;
      $log.log('not found in cart so adding it');
    }
  };
  this.quantityChange = function (index, change) {
    // $log.log(vm.cart[index].quantity);
    if (vm.cart[index].qty >= 1) {
      vm.cart[index].qty = vm.cart[index].qty + parseInt(change);
      // vm.cart[index].quantity++;
      // body...
    }
  };
  // this.quantityChange = function (index, change) {
  //   $log.log(index + '  ' + change)
  //   vm.cart[index].quantity += change;
  //   // body...
  // };
  // $('#cart').affix({
  //   offset: {
  //     top: 16
  //   }
  // });
}

module.exports = {
  template: require('./productCategory.html'),
  controller: productCategoryController
};
