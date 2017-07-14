var localforage = require('localforage');
var Parse = require('parse');

function productCategoryController($scope, $log, StockService, localStorageService, lf) {
  var vm = this;
  this.products = [];
  this.cart = [];
  this.cartCount = 0;
  this.c = {};
  // this.toast = function (message) {
  //     $ionicLoading.show({
  //           template: message
  //       });
  //     $timeout(function () {
  //           $ionicLoading.hide();
  //       }, 1000);
  //   };
  /**
   * assigns color to a category and saves it in an object with key as category and value as color
   * @return {null} no return type it stores the object in a variable that can be used.
   */
  this.colorMap = function () {
    var categories = Parse.User.current().get('categories');
    var colors = angular.fromJson(localStorageService.get('colors'));
    vm.c = _.zipObject(categories, colors);
    // return vm.c;
  };
  // body...
  this.colorMap();
  // $scope.names = [];
  /**
   * get products from the local indexedDB to display it on the product category list
   * @return {null} adds the products into n array called products which is used to display on the view.
   */
  this.getProducts = function () {
    var some = [];
    $log.log('function getProducts is called ');
    lf.ProductsDb
      .iterate(function (value, key, iterationNumber) {
        // $log.log(value.name);
        var color = _.property(value.category)(vm.c);
        $log.log(color);
        value.style =
          _.property(value.category)(vm.c) ? { 'background-color': color } : { 'background-color': '#ccc' };
        vm.products.push(value);
        $log.log(value.style);
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

  /**
   * add cart array into localStorage
   * @param {array} vm.cart array of items that is stored in cart variable.
   */
  this.addCartToLocal = function (cart) {
    localStorageService.set('cart', angular.toJson(cart));
    // body...
  };
  /**
   * add products into the cart array from a click on the products category list
   * @param  {object} cartProduct object of the product which is clicked on the products category list
   * @return {null}             it adds the product with quantity as 1 in the cart array
   */
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
    this.addCartToLocal(vm.cart);
  };
  /**
   * function is used to change the quantity of a item in a cart
   * @param  {number} index  the index of the item in the cart array
   * @param  {number} change the change in quantity of the item
   * @return {null}        nothing is returned it just cahnges the quantity in the cart array
   */
  this.quantityChange = function (index, change) {
    // $log.log(vm.cart[index].quantity);
    if (vm.cart[index].qty >= 1) {
      vm.cart[index].qty = vm.cart[index].qty + parseInt(change);
      // vm.cart[index].quantity++;
      this.addCartToLocal(vm.cart);
    }
  };
  this.qtyValidation = function (index, quantity) {
    if (quantity < 1)
    {
      vm.cart[index].qty = 1;
      // vm.toast('Please Enter quantity greater than 1');
    }
    else if (quantity > 500) {
      vm.cart[index].qty = 500;
      // vm.toast('Please Enter quantity less than 500');

    }
    // body...
  };
  // this.quantityChange = function (index, change) {
  //   $log.log(index + '  ' + change)
  //   vm.cart[index].quantity += change;
  //   // body...
  // };
  // angular.element('#cart').affix({
  //   offset: {
  //     top: 16
  //   }
  // });


}

module.exports = {
  template: require('./productCategory.html'),
  controller: productCategoryController
};
