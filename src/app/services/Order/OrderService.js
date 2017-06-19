var moment = require('moment');
var vendor = '1c2a216405e85c2d7d5ca244e5258ae2';
var URL = 'http://192.168.1.5:1337';

function OrderService($log, $http, CommonService) {
    return {
        getOrders: function (skip, limit, state, user, storeId, complete, date, style, correctedTime) {
            $log.log(skip + ' limit ' + limit + ' style ' + style);
            var url = URL + ENDPOINT + 'orders/' + vendor + '?limit=' + limit;
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
            } else {
                $log.log('No user signed in');
            }
            var config = {
                cache: false
            };
            return $http.get(url);
        },
        getOrderItems: function (id, store) {
            return $http.get(URL + ENDPOINT + 'items/' + id);
        },
        // removeOrderItem: function (id, store) {
        //     return $http.delete(URL + ENDPOINT + 'item/' + id);
        // }
        updateOrderItems: function (id, quantity, discount, discountCode, remarks) {
            var body = {
                id: id,
                quantity: parseFloat(quantity),
                discount: parseFloat(discount),
                discountCode: discountCode,
                remarks: remarks
            };
            return $http.put(URL + ENDPOINT + 'item/' + id, body);
        },
        createOrder: function (newStyle) {
            var order = [];
            var body = {
                mode: 'online',
                style: newStyle,
                type: 'ecommerce',
                owner: 'AS742HJVZK'
            };
            $log.log('creating online order');
            return $http.post(URL + ENDPOINT + 'order/' + vendor, body);
        },
        linkOrder: function (orderId, itemId) {
            return $http.post(URL + ENDPOINT + 'linkOrder', { orderId: orderId, itemId: itemId });
        },

        addOrderItems: function (items, store) {
            return $http.post(URL + ENDPOINT + 'add', { items: items, store: store });
        }
    };
}
const ENDPOINT = '/order/';
module.exports = OrderService;
