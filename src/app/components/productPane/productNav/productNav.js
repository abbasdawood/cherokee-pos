function productNavController($rootScope) {
  this.text = 'My brand new component!';
  var vm = this;

  this.categories = [];
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
  }];
  angular.forEach(jsonobj, function (element, index) {
    vm.categories.push(element.category);
  });
  this.showCategory = function (category) {
    $rootScope.$broadcast('showCategory', category);
  };
}

module.exports = {
  template: require('./productNav.html'),
  controller: productNavController
};