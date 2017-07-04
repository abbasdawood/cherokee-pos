var localforage = require('localforage');

function StockService($http, $log, $q, ENV) {

  var service = this;

  this.getProducts = function (skip, limit, key, not, name, ascending,
    contains, store, category) {
    $log.log('in here.....');
    var deferred = $q.defer();
    var url = ENV.serverURL + ENDPOINT + 'products/' +
      vendor + '?skip=' + skip + '&limit=' + limit;
    // + '?skip=' + skip + '&limit=' + limit;
    var config = {
      cache: false
    };
    return $http.get(url, config);
  };

  return {
    some: function () {
      $log.log('here..in some function');
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
      ENV.ProductsDb.clear()
        .then(function () {
          $log.log('getting products...');
          service.getProducts(0, 1000, null, null, null, null, null, null, null)
            .then(function (response) {
              $log.log('got products');
              var products = response.data;
              _.each(products, function (product) {
                // $log.log('putting ');
                ENV.ProductsDb.setItem(product.id, product);
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
    },
    getProducts: service.getProducts
  };
}

var vendor = '1c2a216405e85c2d7d5ca244e5258ae2';
var ENDPOINT = '/stock/';

module.exports = StockService;
