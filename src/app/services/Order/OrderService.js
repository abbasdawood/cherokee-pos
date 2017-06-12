var moment = require('moment');
var vendor = '1c2a216405e85c2d7d5ca244e5258ae2';

function OrderService($q, $log, $http, CommonService) {
    return {
        getOrders: function (skip, limit, state, user, storeId, complete, date, style, correctedTime) {
            // var deferred = $q.defer();
            $log.log(skip + ' limit ' + limit + ' style ' + style);
            // var orders = [];
            var url = 'http://192.168.1.3:1337' + ENDPOINT + 'orders/' + vendor + '?limit=' + limit;
            if (style) {
                url = url + '&style=' + style;
            }
            if (skip) {
                url = url + '&skip=' + skip;
            }
            // if (vendor) {
            // var vendor = Parse.User.current().get('keys').vendorKey;
            var queryParams = {};
            if (skip) {
                queryParams.skip = parseInt(skip);
            }
            if (limit) {
                queryParams.limit = parseInt(limit);
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
                $log.log('latest style is this' + style);
            }
            if (user) {
                queryParams.user = user;
            }
                if (storeId) {
                queryParams.store = storeId;
            }
            queryParams.close = '01';
            var queryData = CommonService.serialize(queryParams);
            $log.log(queryData);
            if (queryData) {
                url = url + '?' + queryData;
                $log.log(url);
            }
            // } else {
            //     $log.log('No user signed in');
            // }
            // var config = {
            //     cache: false
            // };
            return $http.get(url);
        }
    };
}
const ENDPOINT = '/order/';
module.exports = OrderService;
