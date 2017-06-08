function OrderService() {
}

OrderService.prototype.getOrders = function (skip, limit, state, user, storeId, complete, date, style, correctedTime) {
                var orders = [];
                // var offlineStoragePromises = [];

                if (vendor) {
                    // var vendor = Parse.User.current().get('keys').vendorKey;
                    var url = ENV.serverURL + ENDPOINT + 'orders/' + vendor;

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
                        console.log(complete);
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

                    queryParams.close = Parse.User.current().get('closingTime') ? parseInt(Parse.User.current().get('closingTime').substr(0, 2)) : 0;

                    var queryData = commonService.serialize(queryParams);
                    console.log(queryData);

                    if (queryData) {
                        url = url + '?' + queryData;
                    }

                    // if (Offline.state === 'up') {
                    //     $http
                    //         .get(url)
                    //         .then(function(response) {
                    //             console.log('response from API');
                    //             console.log(response.data);
                    //             orders = response.data;
                    //             //Now check the local store for any orders
                    //             _.each(response.data, function(order) {
                    //                 offlineStoragePromises.push(offlineOrderService.storeInitiatedOrder(order));
                    //             });

                    //             return $q.all(offlineStoragePromises);
                    //         })
                    //         .then(function(offlineIds) {
                    //             console.log('http get orders fulfilled finally');
                    //             console.log('promise array read');
                    //             console.log(offlineIds);
                    //             _.each(offlineIds, function(offlineId, index) {
                    //                 orders[index].offlineId = offlineId;
                    //                 console.log('linked local order Id');
                    //             });
                    //             return offlineOrderService.getOrders(complete, state);
                    //         })
                    //         .then(function(offlineOrders) {
                    //             console.log(offlineOrders);
                    //             _.each(offlineOrders, function(offlineOrder) {
                    //                 orders.push(offlineOrder);
                    //             });

                    //             orders = _.uniq(orders);
                    //             deferred.resolve(orders);
                    //         })
                    //         .catch(function(response) {
                    //             if (orders) {
                    //                 deferred.resolve(orders);
                    //             } else {
                    //                 deferred.reject(response.data);
                    //             }
                    //         });
                    // } else {
                    //     // Retreive the orders from the indexedDB
                    //     console.log('getting offline orders, connection is out');
                    //     offlineOrderService
                    //         .getOrders(complete, state)
                    //         .then(function(orders) {
                    //             deferred.resolve(orders);
                    //         })
                    //         .catch(function(error) {
                    //             deferred.reject({ message: 'No offline orders found' });
                    //         });
                    // }
                } 
                else {
                    deferred.reject({ message: 'No user signed in' });
                }
                return $http.getOrders();
            },
};

module.exports = OrderService;