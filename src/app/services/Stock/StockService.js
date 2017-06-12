function StockService($http, $log) {
  $log.log('here is stock service');

  return {
    some: function () {
      $log.log('here..in some function');
    },
    getProducts: function (skip, limit, key, not, name, ascending,
      contains, store, category) {
      $log.log('in here is get prodcuts func');

      var url = 'http://192.168.1.3:1337' + ENDPOINT + 'products/' +
        vendor + '?skip=' + skip + '&limit=' + limit;
      var config = {
        cache: false
      };
      return $http.get(url, config);
    }
  };
}
var vendor = '1c2a216405e85c2d7d5ca244e5258ae2';
var ENDPOINT = '/stock/';

module.exports = StockService;
