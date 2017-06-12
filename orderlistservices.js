

createInstantOrder: function(style, reference) {
                console.log(Offline.state === 'up');
                var deferred = $q.defer();
                var mode, type, owner;
                var order = {};

                if (vendor) {
                    owner = Parse.User.current().id;
                    type = Parse.User.current().get('type');
                    mode = Parse.User.current().get('role') === 'BOSS' ?
                        'online' :
                        'store';

                    var body = {
                        mode: mode,
                        style: style,
                        type: type,
                        owner: owner,
                        reference: reference
                    };

                    if (Offline.state === 'up') {
                        console.log('creating instant online order');
                        $http
                            .post(ENV.serverURL + ENDPOINT + 'order/' + vendor, body)
                            .then(function(response) {
                                order.id = response.data.objectId;
                                return offlineOrderService.storeInitiatedOrder(response.data, owner);
                            })
                            .then(function(offlineId) {
                                console.log(offlineId);
                                order.offlineId = offlineId;
                                console.log(order);
                                deferred.resolve(order);
                            })
                            .catch(function(error) {
                                deferred.reject(error.data);
                            });
                    } else {
                        console.log('creating instant offline order');

                        offlineOrderService.createInstantOrder(style).then(function(offlineId) {
                                deferred.resolve({ id: offlineId, offlineId: offlineId });
                            })
                            .catch(function(error) {
                                console.error(error);
                                deferred.reject(error);
                            });
                    }


                } else {
                    deferred.reject({ message: 'No user signed in' });
                }

                return deferred.promise;
            },

            addOrderItems: function(items, store) {
                var deferred = $q.defer();

                if (Offline.state === 'up') {
                    $http
                        .post(ENV.serverURL + ENDPOINT + 'add', { items: items, store: store })
                        .then(function(response) {
                            console.log(response.data);
                            deferred.resolve(response.data);
                        }, function(error) {
                            console.log(error);
                            deferred.reject(error);
                        });
                }
                return deferred.promise;
            },

linkOrder: function(id, itemId) {
                console.log('recd order ' + id + ' and item ' + itemId);
                var deferred = $q.defer();

                if (Offline.state === 'up') {
                    $http
                        .post(ENV.serverURL + ENDPOINT + 'linkOrder', {
                            orderId: id,
                            orderItemId: itemId
                        })
                        .then(function(response) {
                            console.log(response.data.id);
                            deferred.resolve(response.data.id);
                        }, function(error) {
                            console.log(error);
                            deferred.reject(error.data);
                        });
                } else {
                    // Create a new order in the localstorage and link the items from the localstorage in it
                }


                return deferred.promise;
            },

            removeOrderItem: function(id, store, offline) {
                var deferred = $q.defer();
                var res;

                var url = ENV.serverURL + ENDPOINT + 'item/' + id;

                if(store){
                    url = url + '?store=' + store;
                }

                if (Offline.state === 'up') {
                    $http
                        .delete(url)
                        .then(function(response) {
                            res = response;
                            return offlineOrderService.removeOrderItem(id, offline);
                        })
                        .then(function() {
                            deferred.resolve(res.data.id);
                        })
                        .catch(function(error) {
                            deferred.reject(error.data);
                        });
                } else {
                    // Remove the item from localstorage with the help of the id
                    offlineOrderService.removeOrderItem(id, offline).then(function() {
                        deferred.resolve('item');
                    }).catch(function() {
                        deferred.reject({ message: 'Item was not deleted' });
                    });
                }
                return deferred.promise;
            },


            updateOrderItem: function(id, quantity, discount, discountCode, remarks, store, orderId) {
                var deferred = $q.defer();
                var res;

                var body = {
                    quantity: parseInt(quantity),
                    discount: parseFloat(discount),
                    discountCode: discountCode,
                    remarks: remarks,
                    store: store,
                    orderId: orderId
                };

                if (Offline.state === 'up') {
                    $http
                        .put(ENV.serverURL + ENDPOINT + 'item/' + id, body)
                        .then(function(response) {
                            res = response;
                            deferred.resolve(res.data.id);
                        })
                        .catch(function(error) {
                            deferred.reject(error.data);
                        });
                }
                return deferred.promise;
            },

            generateLink: function(data) {
                var deferred = $q.defer();

                $http.post(ENV.serverURL + ENV.payPath + '/generate', data)
                    .then(function(response) {
                        console.log(response);
                        deferred.resolve(response.data.payment_request.longurl);
                    }, function(error) {
                        console.log(error);
                        deferred.reject(error);
                    });

                return deferred.promise;
            },

            getOrders: function(skip, limit, state, user, storeId, complete, date, style, correctedTime) {
                var deferred = $q.defer();

                var orders = [];
                var offlineStoragePromises = [];

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

                    if (Offline.state === 'up') {
                        $http
                            .get(url)
                            .then(function(response) {
                                console.log('response from API');
                                console.log(response.data);
                                orders = response.data;
                                //Now check the local store for any orders
                                _.each(response.data, function(order) {
                                    offlineStoragePromises.push(offlineOrderService.storeInitiatedOrder(order));
                                });

                                return $q.all(offlineStoragePromises);
                            })
                            .then(function(offlineIds) {
                                console.log('http get orders fulfilled finally');
                                console.log('promise array read');
                                console.log(offlineIds);
                                _.each(offlineIds, function(offlineId, index) {
                                    orders[index].offlineId = offlineId;
                                    console.log('linked local order Id');
                                });
                                return offlineOrderService.getOrders(complete, state);
                            })
                            .then(function(offlineOrders) {
                                console.log(offlineOrders);
                                _.each(offlineOrders, function(offlineOrder) {
                                    orders.push(offlineOrder);
                                });

                                orders = _.uniq(orders);
                                deferred.resolve(orders);
                            })
                            .catch(function(response) {
                                if (orders) {
                                    deferred.resolve(orders);
                                } else {
                                    deferred.reject(response.data);
                                }
                            });
                    } else {
                        // Retreive the orders from the indexedDB
                        console.log('getting offline orders, connection is out');
                        offlineOrderService
                            .getOrders(complete, state)
                            .then(function(orders) {
                                deferred.resolve(orders);
                            })
                            .catch(function(error) {
                                deferred.reject({ message: 'No offline orders found' });
                            });
                    }


                } else {
                    deferred.reject({ message: 'No user signed in' });
                }

                return deferred.promise;
            },

            getOrder: function(id, offlineId) {
                var deferred = $q.defer();
                var order = {};

                if (Offline.state === 'up') {
                    console.log('getting order from API');
                    $http.get(ENV.serverURL + ENDPOINT + 'order/' + id)
                        .then(function(response) {
                            order = response.data;
                            return offlineOrderService.storeInitiatedOrder(order);
                        })
                        .then(function(offlineId) {
                            console.log('got the offline id');
                            order.offlineId = offlineId;
                            deferred.resolve(order);
                        })
                        .catch(function(response) {
                            console.log(response);
                            if (!response) {
                                console.log('here.....');
                                deferred.resolve(order);
                            }
                            if (response.status === 400) {
                                deferred.reject(false);
                            } else {
                                console.log(response);
                                deferred.reject(response.data);
                            }
                        });
                } else {
                    console.log('getting order from localDB');
                    offlineOrderService.getOrder(parseInt(id)).then(function(order) {
                        console.log(order);
                        deferred.resolve(order);
                    }).catch(function(error) {
                        console.log(error);
                        deferred.reject(error);
                    });
                }

                return deferred.promise;
            },

            getOrderItems: function(id, offlineId, store) {
                var deferred = $q.defer();
                var list = [];
                var prunedLocalItems;
                var orderUpdated;

                if (Offline.state === 'up') {
                    $http.get(ENV.serverURL + ENDPOINT + 'items/' + id).then(function(response) {
                            list = response.data;
                            if (!_.isUndefined(offlineId)) {
                                return offlineOrderService.getOrderItems(offlineId);
                            } else {
                                deferred.resolve(list);
                                throw new Error('early exit');
                            }
                        })
                        .then(function(offlineItems) {
                            // list = [1,2];
                            // localItems = [3,4];
                            console.log('retrieved local order items');
                            var localItems = offlineItems;
                            console.log('Items in the local storage ' + offlineItems.length);
                            console.log(localItems);
                            var addDiffItemsPromises = [];

                            if (list.length === localItems.length) {
                                // The order is at sync
                                console.log('Localitems and Retrieved are same, not doing anything');
                                // deferred.resolve(list);
                                throw new Error('early exit');
                            } else {
                                // These are the items in local store but not on server
                                prunedLocalItems = _.filter(localItems, function(item) {
                                    return !item.id;
                                });
                                console.log('these items were created locally');
                                console.log(prunedLocalItems);
                                _.each(prunedLocalItems, function(item) {
                                    addDiffItemsPromises.push(orderService.addOrderItem(item, store));
                                });

                                return $q.all(addDiffItemsPromises);
                            }
                        })
                        .then(function(result) {
                            if (_.isArray(result)) {
                                console.log('Pruned local items saved to server');
                                console.log(result);
                                _.each(prunedLocalItems, function(localItem, index) {
                                    localItem.id = result[index];
                                });
                                console.log(prunedLocalItems);
                                if (result.length) {
                                    list = _.union(list, prunedLocalItems);
                                }
                                console.log('Final list to be synced with localDb');
                                console.log(list);
                                // setting last param as true to replace entire copy of local order items
                                return offlineOrderService.addOrderItem(list, offlineId, store, true);
                            } else if (_.isNumber(result)) {
                                // deferred.resolve(list);
                                throw new Error('early exit');
                            }
                        })
                        .then(function() {
                            console.log('returning order items');
                            deferred.resolve(list);
                        })
                        .catch(function(error) {
                            console.log('error caught');
                            if (_.isBoolean(error) && !error) {
                                deferred.resolve(list);
                            }

                            if (error.message === 'early exit') {
                                console.info('2+2=cuckoo');
                                deferred.resolve(list);
                            }

                            if (error.status === 400) {
                                // Search for the order in the IndexedDb
                                offlineOrderService.getOrderItems(parseInt(id)).then(function(items) {
                                    deferred.resolve(items);
                                }).catch(function(error) {
                                    console.log(error);
                                    deferred.reject({ message: 'No items in this order' });
                                });
                            }
                        });

                } else {
                    offlineOrderService.getOrderItems(parseInt(id)).then(function(items) {
                        _.each(items, function(item) {
                            item.id = item.itemId;
                        });

                        deferred.resolve(items);
                    }).catch(function(error) {
                        console.log(error);
                        deferred.reject({ message: 'No items in this order' });
                    });
                }

                return deferred.promise;
            },
