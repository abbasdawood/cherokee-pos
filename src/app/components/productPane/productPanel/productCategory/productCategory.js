function productCategoryController($scope, $log, $rootScope, StockService) {
  var vm = this;
  this.products = [];
  this.names = [];
  this.sendItemId = function (product) {
    $log.log('send  ' + product.id);
    $rootScope.$broadcast('itemObj', {
      id: product.id,
      name: product.name
    });
  };
  // $scope.$on('showCategory', function (event, category) {
  //   var categoryDisplay = category;
  //   $log.log('Recd ct: ' + category);
  this.i = 0;
  this.busy = false;
  this.pageLoad = function () {
    if (vm.busy) {
      return;
    }
    vm.busy = true;
    StockService
      .getProducts((vm.i), 50, null, null, null, null, null, null,
        $scope
        .categoryDisplay)
      .then(function (products) {
        $log.log('this is returned ' + products);
        $log.log(products.data);
        angular.forEach(products.data, function (element) {
          vm.products.push(element);
        });
        vm.i++;
        vm.busy = false;
      })
      .catch(function (error) {
        $log.error(error);
      });
  };
  this.pageLoad();
}
module.exports = {
  template: require('./productCategory.html'),
  controller: productCategoryController
};
