function StockService($http, $log, $q) {
  var localforage = require('localforage');
  return {
    some: function () {
      $log.log('here..in some function');
    },
    getProducts: function (skip, limit, key, not, name, ascending,
      contains, store, category) {
      $log.log('in here.....');
      var deferred = $q.defer();
      var url = 'http://192.168.1.3:1337' + ENDPOINT + 'products/' +
        vendor + '?skip=' + skip + '&limit=' + limit;
      // + '?skip=' + skip + '&limit=' + limit;
      var config = {
        cache: false
      };
      // return $http.get(url, config);
      var jsonobj = [{
        id: 'yLWYsL3yjX',
        name: 'triple schezwan fried rice',
        subtitle: 'Vegetable',
        description: null,
        order: 120,
        rate: 180,
        category: 'beverages',
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
      // return jsonobj;
      deferred.resolve(jsonobj);
      return deferred.promise;
    },
    fetchToLocal: function (count, store) {
      var deferred = $q.defer();
      // localforage
      //   .open()
      //   .then(function () {

      //   return localforage.products.count();
      // })
      // .then(function (items) {
      //   if (items === count) {
      //     $log.log('Items in DB ' + items + ' Retrieved ' + count);
      //     deferred.resolve({ code: 100, message: 'Products already synced' });
      //   } else {
      // if (Offline.state === 'up') {
      localforage.clear()
        .then(function () {
          $log.log('getting products...');
          StockService.prototype.getProducts(0, 1000, null, null, null, null, null, null, null)
          .then(function (products) {
            $log.log('got products');
            _.each(products, function (product) {
              localforage.setItem(product.id, product);
            });
          });
          deferred.resolve({ code: 200, message: 'All products synced successfully' });
        })
        .catch(function (error) {
          $log.error(error);
          deferred.reject({ code: 300, message: 'Sync error, please press Ctrl + Shift + R' });
        });
      // })
      // .catch(function (error) {
      //   $log.error(error);
      //   deferred.reject({ code: 300, message: 'Sync error, we will attempt to resync the next time automatically' });
      // });

      return deferred.promise;
    }
  };
}

var vendor = '1c2a216405e85c2d7d5ca244e5258ae2';
var ENDPOINT = '/stock/';

module.exports = StockService;
