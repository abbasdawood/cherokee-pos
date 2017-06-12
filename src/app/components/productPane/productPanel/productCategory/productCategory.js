function productCategoryController($scope, $log, $rootScope, StockService) {
  var localforage = require('localforage');
  var vm = this;
  this.products = [];
  this.names = [];
  // var jsonobj = [{
  //   id: 'yLWYsL3yjX',
  //   name: 'triple schezwan fried rice',
  //   subtitle: 'Vegetable',
  //   description: null,
  //   order: 120,
  //   rate: 180,
  //   category: 'beverages',
  //   stats: {
  //     __type: 'Relation',
  //     className: 'ProductStats'
  //   },
  //   updatedAt: '2017-06-01T09:27:35.382Z',
  //   tax: 0,
  //   words: ['rice', 'triple', 'schezwan', 'fried', 'vegetable', 'tri',
  //     'sch', 'fri', 'ric'
  //   ]
  // }, {
  //   id: 'asdfghjX',
  //   name: 'vada pav',
  //   subtitle: 'Vegetable',
  //   rate: 180,
  //   category: 'fast food'
  // }, {
  //   id: 'asdfghj',
  //   name: ' fried rice',
  //   subtitle: 'Vegetable',
  //   rate: 180,
  //   category: 'rice'
  // }];
  // $scope.$on('showCategory', function (event, category) {
  //   var categoryDisplay = category;
  //   vm.names = [];
  //   angular.forEach(jsonobj, function (element) {
  //     if (categoryDisplay === element.category) {
  //       vm.names.push(element);
  //     }
  //   });
  // });
  this.sendItemId = function (product) {
    $log.log('send  ' + product.id);
    $rootScope.$broadcast('itemObj', {
      id: product.id,
      name: product.name
    });
  };
  $scope.$on('showCategory', function (event, category) {
    var categoryDisplay = category;
    $log.log('Recd ct: ' + category);
  });
  this.i = 0;
  this.busy = false;
  this.pageLoad = function () {
    if (vm.busy) {
      return;
    }
    vm.busy = true;
    // vm.i++;
    StockService
      .getProducts((vm.i), 50, null, null, null, null, null, null, $scope.categoryDisplay)
      .then(function (products) {
        $log.log('this is returned ' + products);
        $log.log(products.data);
        angular.forEach(products, function (element) {
          vm.products.push(element);
          $log.log(element);
          localforage.setItem(element.id, element);
          $log.log('item set');
        });

        vm.i++;
        vm.busy = false;
      })
      .catch(function (error) {
        $log.error(error);
      });
  };
  this.pageLoad();
  StockService.fetchToLocal(null, null);
}
module.exports = {
  template: require('./productCategory.html'),
  controller: productCategoryController
};
