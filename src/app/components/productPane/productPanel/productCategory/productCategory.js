function productCategoryController($window, $scope, $log, $rootScope) {
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
    description: null,
    order: 120,
    rate: 180,
    category: 'fast food',
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
    id: 'asdfghj',
    name: ' fried rice',
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
  }];
  $scope.$on('showCategory', function (event, category) {
    var categoryDisplay = category;
    vm.names = [];
    angular.forEach(jsonobj, function (element) {
      if (categoryDisplay === element.category) {
        vm.names.push(element);
      }
    });
  });

  this.sendItemId = function (id) {
    $log.log('send  ' + id);
    $rootScope.$broadcast('itemId', id);
  };
}
module.exports = {
  template: require('./productCategory.html'),
  controller: productCategoryController
};