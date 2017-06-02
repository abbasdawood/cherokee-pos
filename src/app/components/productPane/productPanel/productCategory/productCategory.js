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
  angular.forEach(jsonobj, function (element, index) {
    vm.names.push({
      name: element.name,
      id: element.id
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