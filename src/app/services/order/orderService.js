function OrderService($log, $http, commonService, moment) {
  return {
    getOrders: function (skip, limit, state, user, storeId, complete, date, style, correctedTime) {
      var orders = [];
      var url = 'http://192.168.1.3:1337' + ENDPOINT + 'orders/' + vendor;
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
// function OrderService() {
// }

// OrderService.prototype.getData = function () {
//   var json = [{
//     id: '1HFeCOI1LS',
//     total: 2087,
//     discount: 0,
//     addressId: null,
//     subtotal: 1830,
//     state: 'initiated',
//     updated: '2017-06-01T09:49:12.107Z',
//     status: [
//       {
//         name: 'initiated',
//         date: '2017-05-31T17:08:03.978Z'
//       },
//       {
//         name: 'initiated',
//         date: '2017-05-31T17:08:03.978Z'
//       }
//     ],
//     date: null,
//     time: null,
//     mode: 'online',
//     placedDate: '2017-05-31T17:08:03.982Z',
//     billNo: '310517-0483',
//     tax: 0,
//     addOnTaxes: [
//       {
//         name: 'Service Tax',
//         percent: 14,
//         amount: 256.20000000000005,
//         selected: true
//       }
//     ],
//     deliveryCharge: 0,
//     reference: null,
//     style: 'inStore',
//     roundOff: 0.8000000000001819,
//     advance: 0,
//     owner: 'AS742HJVZK'
//   }];
//   return json;
// };

// module.exports = OrderService;