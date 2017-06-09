function OrderService($log, $http, commonService, moment) {
  return {
    getOrders: function (skip, limit, state, user, storeId, complete, date, style, correctedTime) {
      var orders = [];
      var url = 'http://192.168.1.2:1337' + ENDPOINT + 'orders/' + vendor;
      if (vendor) {
      // var vendor = Parse.User.current().get('keys').vendorKey;
                    var queryParams = {};
                    if (skip) {
                        queryParams.skip = parseInt(skip, 10);
                    }
                    if (limit) {
                        queryParams.limit = parseInt(limit, 10);
                    }
                    if (state) {
                        queryParams.state = state;
                    }
                    if (complete) {
                        $log.log(complete);
                        queryParams.complete = complete;
                    }
                    if (date) {
                        queryParams.date = moment(date).format('x');
                    }
                    if (style) {
                        queryParams.style = style;
                    }

                    if (user) {
                        queryParams.user = user;
                    }

                    if (storeId) {
                        queryParams.store = storeId;
                    }

                    queryParams.close = '01';

                    var queryData = commonService.serialize(queryParams);
                    $log.log(queryData);

                    if (queryData) {
                        url = url + '?' + queryData;
                 }
               }
      else {
        $log.log('No user signed in');
      }
      var config = {
        cache: false
      };
      return $http.get(url, config);
    }
  };
}
const ENDPOINT = '/order/';
var vendor = '1c2a216405e85c2d7d5ca244e5258ae2';
module.exports = OrderService;