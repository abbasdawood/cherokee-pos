/*jshint esversion: 6 */

angular.module('stock').factory('inventoryService', function($q, $http, ENV, commonService) {

    const ENDPOINT = '/inventory/';

    var inventoryService = {

        addItem: function(item) {
            var deferred = $q.defer();

            if (Parse.User.current()) {

                var vendor = Parse.User.current().get('keys').vendorKey;

                $http
                    .post(ENV.serverURL + ENDPOINT + 'item/' + vendor, { item: item })
                    .then(function(response) {
                        deferred.resolve(response.data.objectId);
                    }).catch(function(response) {
                        deferred.reject(response.data);
                    });

            } else {
                deferred.reject({ code: 404, message: 'No user signed in' });
            }

            return deferred.promise;
        },

        getItems: function(skip, limit, name, type, storeId) {
            var deferred = $q.defer();
            if (Parse.User.current()) {
                var vendor = Parse.User.current().get('keys').vendorKey;
                var url = ENV.serverURL + ENDPOINT + 'all/' + vendor;

                var queryParams = {};
                if (skip) {
                    queryParams.skip = parseInt(skip);
                }
                if (name) {
                    queryParams.name = name.toLowerCase();
                }
                if (limit) {
                    queryParams.limit = parseInt(limit);
                }
                if (storeId) {
                    queryParams.store = storeId;
                }
                if (type) {
                    queryParams.type = type;
                }

                var queryData = commonService.serialize(queryParams);

                if (queryData) {
                    url = url + '?' + queryData;
                }

                $http
                    .get(url)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    })
                    .catch(function(response) {
                        deferred.reject(response.data);
                    });

            } else {
                deferred.reject({ message: 'No user signed in' });
            }

            return deferred.promise;
        },

        getItem: function(id, store) {
            var deferred = $q.defer();
            var url = ENV.serverURL + ENDPOINT + id;
            if (store) {
                url = url + '?store=' + store;
            }

            $http
                .get(url)
                .then(function(response) {
                    deferred.resolve(response.data);
                }).catch(function(response) {
                    deferred.reject(response.data);
                });

            return deferred.promise;
        },

        checkName: function(name) {
            var deferred = $q.defer();
            var list = [];

            var query = new Parse.Query('InventoryItem');
            query.equalTo('vendor', Parse.User.current().get('keys').vendorKey);
            query.equalTo('name', name.toLowerCase());
            query.first().then(function(item) {
                if (item) {
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        },

        sendToStore: function(item, destination, source) {
            var deferred = $q.defer();

            $http
                .post(ENV.serverURL + ENDPOINT + 'transfer', {
                    item: item,
                    source: source,
                    destination: destination
                })
                .then(function(response) {
                    console.log(response.data);
                    deferred.resolve(response.data);
                })
                .catch(function(error) {
                    console.error(error.data);
                    deferred.reject(error.data);
                });

            return deferred.promise;
        },

        updateItem: function(item, type, store) {
            var deferred = $q.defer();

            var body = {
                item: item,
                type: type,
                store: store
            };

            $http
                .put(ENV.serverURL + ENDPOINT + 'item/' + item.selected.id, body)
                .then(function(response) {
                    deferred.resolve(response.data);
                }).catch(function(response) {
                    deferred.reject(response.data);
                });

            return deferred.promise;
        },

        addVendor: function(vendorName) {
            var deferred = $q.defer();

            var Vendor = new Parse.Object.extend('Vendor');
            var v = new Vendor();

            var uid = 'vnd' + Date.now().toString();
            v.set('uniqueId', uid);
            if (Parse.User.current()) {
                v.set('vendor', Parse.User.current().get('keys').vendorKey);

            } else {
                deferred.reject({ message: 'No user signed in' });
            }
            v.set('name', vendorName.toLowerCase());

            v.save().then(function(vendor) {
                deferred.resolve(vendor.get('uniqueId'));
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        },

        getVendors: function() {
            var deferred = $q.defer();
            var list = [];

            var query = new Parse.Query('Vendor');
            query.equalTo('vendor', Parse.User.current().get('keys').vendorKey);
            query.limit(100);
            query.find().then(function(vendors) {
                _.each(vendors, function(vendor) {
                    list.push({
                        'name': vendor.get('name'),
                        'id': vendor.id,
                        'updated': vendor.updatedAt,
                        'uniqueId': vendor.get('uniqueId')
                    });
                });

                deferred.resolve(list);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        },

        getExpenses: function(id, skip, limit, type) {
            var deferred = $q.defer();
            var itemQuery = new Parse.Query('InventoryItem');
            var expenseList = [];
            var retrievedItem;

            itemQuery.get(id).then(function(item) {
                retrievedItem = item;
                var relation = item.relation('attributes');
                var relationQuery = relation.query();
                relationQuery.descending('procuredOn');
                if (skip) {
                    relationQuery.skip(skip * limit);
                }
                if (limit) {
                    relationQuery.limit(limit);
                } else {
                    relationQuery.limit(10);
                }
                if (type) {
                    relationQuery.equalTo('type', type);
                }
                return relationQuery.find();
            }).then(function(expenses) {
                _.each(expenses, function(a) {
                    expenseList.push({
                        id: a.id,
                        procuredOn: a.get('procuredOn'),
                        quantity: a.get('quantity') || 0,
                        cost: a.get('cost'),
                        vendor: a.get('productVendor'),
                        type: a.get('type'),
                        measure: retrievedItem.get('measure')
                    });
                });

                deferred.resolve(expenseList);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;

        },

        getThreshold: function() {
            var deferred = $q.defer();

            var currentUser = Parse.User.current();

            if (currentUser) {
                console.log('User here, getting keys');
                var query = new Parse.Query('UserKeys');
                query.equalTo('vendor', currentUser.get('keys').vendorKey);
                query
                    .first()
                    .then(function(key) {
                        if (key) {
                            var threshold = key.get('reminderThreshold');
                            if (threshold) {
                                deferred.resolve(threshold);
                            } else {
                                deferred.resolve(0);
                            }
                        } else {
                            deferred.resolve(0);
                        }
                    })
                    .catch(function(error) {
                        deferred.reject(error);
                    });
            } else {
                deferred.reject({message:'no user signed in'});
            }

            return deferred.promise;
        },

        getExpenseCount: function(id) {
            var deferred = $q.defer();
            var itemQuery = new Parse.Query('InventoryItem');

            itemQuery.get(id).then(function(item) {
                var relation = item.relation('attributes');
                var relationQuery = relation.query();
                // relationQuery.equalTo('type', 'expense');
                return relationQuery.count();
            }).then(function(count) {
                console.log(count);
                deferred.resolve(count);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }
    };

    return inventoryService;
});
