function productCategoryController($scope, $log, $rootScope, stockService) {
  var vm = this;

  this.names = [];
  var jsonobj = [{
    id: 'yLWYsL3yjX',
    name: 'triple schezwan fried rice',
    subtitle: 'Vegetable',
    description: null,
    order: 120,
    rate: 180,
    category: 'rice',
    stats: {
      __type: 'Relation',
      className: 'ProductStats'
    },
    updatedAt: '2017-06-01T09:27:35.382Z',
    tax: 0,
    words: ['rice', 'triple', 'schezwan', 'fried', 'vegetable', 'tri',
      'sch', 'fri', 'ric'
    ]
  }, {
    id: 'asdfghjX',
    name: 'vada pav',
    subtitle: 'Vegetable',
    rate: 180,
    category: 'fast food'
  }, {
    id: 'asdfghj',
    name: ' fried rice',
    subtitle: 'Vegetable',
    rate: 180,
    category: 'rice'
  }];
  // $scope.$on('showCategory', function (event, category) {
  //   var categoryDisplay = category;
  //   vm.names = [];
  //   angular.forEach(jsonobj, function (element) {
  //     if (categoryDisplay === element.category) {
  //       vm.names.push(element);
  //     }
  //   });
  // });

  this.sendItemId = function (obj) {
    $log.log('send  ' + obj.id);
    $rootScope.$broadcast('itemObj', {
      id: obj.id,
      name: obj.name
    });
  };
  $scope.$on('showCategory', function (event, category) {
    var categoryDisplay = category;
    $log.log('Recd ct: ' + category);
    stockService
      .getProducts(2, 100, null, null, null, null, null, null, $scope.categoryDisplay)
      .then(function (products) {
        $log.log(products);
      })
      .catch(function (error) {
        $log.error(error);
      });
  });
}
module.exports = {
  template: require('./productCategory.html'),
  controller: productCategoryController
};