function StockService($http, $log, $q, cherokeeDB) {

  var getProducts = function (skip, limit, key, not, name, ascending,
      contains, store, category) {
      $log.log('in here...');

      var url = 'http://192.168.1.3:1337' + ENDPOINT + 'products/' +
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
    getProducts: getProducts,
    fetchToLocal: function (count, store) {
      var deferred = $q.defer();
      cherokeeDB
        .open()
        .then(function () {
          return cherokeeDB.products.count();
        })
        .then(function (items) {
          if (items === count) {
            $log.log('Items in DB ' + items + ' Retrieved ' + count);
            deferred.resolve({ code: 100, message: 'Products already synced' });
          } else {
            // if (Offline.state === 'up') {
            cherokeeDB.products.clear()
              .then(function () {
                $log.log('getting products...');
                return getProducts(0, 1000, null, null, null, null, null, store, null);
              })
              .then(function (products) {
                $log.log('got products');
                return cherokeeDB.products.bulkAdd(products);
              })
              .then(function (e) {
                $log.log(e);
                deferred.resolve({code: 200, message: 'All products synced successfully'});
              })
              .catch(function (error) {
                $log.error(error);
                deferred.reject({code: 300, message: 'Sync error, please press Ctrl + Shift + R'});
              });
          }
        })
        .catch(function (error) {
          $log.error(error);
          deferred.reject({ code: 300, message: 'Sync error, we will attempt to resync the next time automatically' });
        });


      return deferred.promise;
    }
  };
}
var vendor = '1c2a216405e85c2d7d5ca244e5258ae2';
var ENDPOINT = '/stock/';

module.exports = StockService;
