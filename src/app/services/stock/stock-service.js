angular.module('stock').factory('stockService', function ($q, ENV, $http,
  localStorageService, commonService, Dexie, cherokeeDB, $rootScope) {

  var ENDPOINT = '/stock/';

  var vendor = Parse.User.current() ? Parse.User.current().get('keys').vendorKey :
    null;

  var subscription;

  var stockService = {
    createProduct: function (item, stores) {
      var deferred = $q.defer();

      var product = {
        name: item.name.toLowerCase(),
        subtitle: item.subtitle,
        order: parseInt(item.order || 0),
        rate: parseFloat(item.rate || 0),
        category: item.category ? item.category.toLowerCase() : null,
        stores: stores
      };

      $http
        .post(ENV.serverURL + ENDPOINT + 'product/' + vendor, {
          product: product
        })
        .then(function (response) {
          deferred.resolve(response.data.objectId);
        }, function (response) {
          deferred.reject(response.data);
        });

      return deferred.promise;
    },

    updateProduct: function (product, variants) {
      var deferred = $q.defer();
      var productId = product.id;
      product = _.omit(product, ['stats', 'id', 'taxPercent']);
      product.rate = parseFloat(product.rate);
      product.order = parseFloat(product.order);

      if (variants && variants.length) {
        product.variants = _.pluck(variants, 'id');
      }

      $http
        .put(ENV.serverURL + ENDPOINT + 'product/' + productId, {
          product: product
        })
        .then(function (response) {
          deferred.resolve(response.data);
        })
        .catch(function (error) {
          deferred.reject(error.data);
        });

      return deferred.promise;
    },

    toggleActive: function (id) {
      var deferred = $q.defer();

      var query = new Parse.Query('Product');
      query
        .get(id)
        .then(function (product) {
          var status = product.get('active');
          product.set('active', !status);

          return product.save();
        })
        .then(function (product) {
          deferred.resolve(product.id);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    },

    deleteProduct: function (id) {
      var deferred = $q.defer();

      var query = new Parse.Query('Product');
      query
        .get(id)
        .then(function (product) {
          return product.destroy();
        })
        .then(function (product) {
          deferred.resolve(product.id);
        }, function (error) {
          deferred.reject(error);
        });


      return deferred.promise;
    },

    getProductsFromLocal: function () {
      var deferred = $q.defer();

      cherokeeDB
        .open()
        .then(function () {
          return cherokeeDB.products.toArray();
        })
        .then(function (p) {
          deferred.resolve(p);
        });

      return deferred.promise;
    },

    getProducts: function (skip, limit, key, not, name, ascending,
      contains, store, category) {
      var deferred = $q.defer();

      var url = 'http://192.168.1.2:1337' + ENDPOINT + 'products/' +
        vendor;

      var config = {
        headers: {
          'x-access-token': localStorageService.get('token')
        },
        cache: true
      };
      var queryParams = {};
      queryParams.skip = skip || 0;
      if (limit) {
        queryParams.limit = limit;
      } else {
        queryParams.limit = 10;
      }
      queryParams.not = not || '';
      queryParams.sortBy = key ? key : 'updatedAt';
      queryParams.asc = ascending ? ascending : false;
      queryParams.name = name ? name : '';
      if (contains && contains.length) {
        queryParams.contains = contains.split(' ');
      }
      if (store) {
        queryParams.store = store;
      }
      if (category) {
        queryParams.category = category;
      }

      var queryData = commonService.serialize(queryParams);

      if (queryData) {
        url = url + '?' + queryData;
      }

      $http
        .get(url, config)
        .then(function (response) {
          deferred.resolve(response.data);
        })
        .catch(function (response) {
          deferred.reject(response.data); //some error occurred, show the error message
        });


      return deferred.promise;
    },

    fetchToLocal: function (count, store) {
      var deferred = $q.defer();

      cherokeeDB
        .open()
        .then(function () {
          return cherokeeDB.products.count();
        })
        .then(function (items) {
          if (items === count) {
            console.log('Items in DB ' + items + ' Retrieved ' +
              count);
            deferred.resolve({
              code: 100,
              message: 'Products already synced'
            });
          } else {
            // if (Offline.state === 'up') {
            cherokeeDB.products.clear()
              .then(function () {
                return stockService.getProducts(0, 1000, null, null,
                  null, null, null, store, null);
              })
              .then(function (products) {
                return cherokeeDB.products.bulkAdd(products);
              })
              .then(function (e) {
                deferred.resolve({
                  code: 200,
                  message: 'All products synced successfully'
                });
              })
              .catch(function (error) {
                console.error(error);
                deferred.reject({
                  code: 300,
                  message: 'Sync error, please press Ctrl + Shift + R'
                });
              });
          }
        })
        .catch(function (error) {
          console.error(error);
          deferred.reject({
            code: 300,
            message: 'Sync error, we will attempt to resync the next time automatically'
          });
        });


      return deferred.promise;
    },

    getProduct: function (id) {
      var deferred = $q.defer();

      if (id) {
        var url = ENV.serverURL + ENDPOINT + 'product/' + id;

        $http
          .get(url)
          .then(function (response) {
            deferred.resolve(response.data);
          }, function (response) {
            deferred.reject(response.data); //some error occurred, show the error message
          });
      } else {
        deferred.reject({
          message: 'No id supplied to API'
        });
      }

      return deferred.promise;
    },

    getTopSelling: function (id) {
      var deferred = $q.defer();

      var close = Parse.User.current().get('closingTime') ? parseInt(
        Parse.User.current().get('closingTime').substr(0, 2)) : 0;
      console.log('running top selling with ID ' + id);
      Parse.Cloud
        .run('getProductStats', {
          id: id,
          close: close
        })
        .then(function (stats) {
          // returnedProduct.stats = stats;
          console.log(stats);
          deferred.resolve(stats);
        })
        .catch(function (error) {
          console.error(error);
          deferred.reject(error);
        });

      return deferred.promise;
    },

    getProductComponents: function (id, type) {
      var deferred = $q.defer();
      $http
        .get(ENV.serverURL + ENDPOINT + 'component/' + id + '?type=' +
          type)
        .then(function (response) {
          deferred.resolve(response.data);
        }, function (response) {
          deferred.reject(response.data);
        });

      return deferred.promise;
    },

    updateProductComponent: function (component, id, type) {
      var deferred = $q.defer();
      $http
        .post(ENV.serverURL + ENDPOINT + 'component/' + id + '?type=' +
          type, {
            component: component
          })
        .then(function (response) {
          deferred.resolve(response.data);
        })
        .catch(function (error) {
          deferred.reject(error.data);
        });

      return deferred.promise;
    },

    editProductComponent: function (newComponent) {
      var deferred = $q.defer();
      var c = {
        quantity: parseFloat(newComponent.quantity),
        show: newComponent.show
      };

      $http
        .put(ENV.serverURL + ENDPOINT + 'component/' + newComponent.id, {
          component: c
        })
        .then(function (response) {
          deferred.resolve(response.data);
        })
        .catch(function (error) {
          console.error(error.data);
          deferred.reject(error.data);
        });

      return deferred.promise;
    },

    deleteProductComponent: function (newComponent) {
      var deferred = $q.defer();
      $http
        .delete(ENV.serverURL + ENDPOINT + 'component/' + newComponent.id)
        .then(function (response) {
          deferred.resolve(response.data);
        })
        .catch(function (error) {
          console.error(error.data);
          deferred.reject(error.data);
        });

      return deferred.promise;
    },

    getProductStats: function (id, minDate, maxDate, store) {
      var deferred = $q.defer();
      var url = ENV.serverURL + ENDPOINT + 'stats/' + id;

      var config = {
        headers: {
          'x-access-token': localStorageService.get('token')
        },
        cache: true
      };

      var queryParams = {};

      queryParams.maxDate = maxDate ? moment(maxDate).toDate() : moment()
        .toDate();
      queryParams.minDate = minDate ? moment(minDate).toDate() : moment()
        .subtract(15, 'd').toDate();

      if (store) {
        queryParams.store = store;
      }

      var queryData = commonService.serialize(queryParams);

      if (queryData) {
        url = url + '?' + queryData;
      }

      $http
        .get(url, config)
        .then(function (response) {
          deferred.resolve(response.data);
        }).catch(function (error) {
          console.error(error.data);
          deferred.reject(error.data);
        });


      return deferred.promise;
    },

    searchProduct: function (words) {
      var deferred = $q.defer();

      var list = [];

      var toLowerCase = function (w) {
        return w.toLowerCase();
      };

      var query = new Parse.Query('Product');
      query.equalTo('vendor', vendor);
      var splitWords = words.split(' ');
      splitWords = _.map(splitWords, toLowerCase);
      query.containsAll('words', splitWords);
      query.find().then(function (products) {
          _.each(products, function (product) {
            list.push({
              id: product.id,
              name: product.get('name'),
              subtitle: product.get('subtitle'),
              category: product.get('category') || ''
            });
          });
          deferred.resolve(list);
        })
        .catch(function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    },

    addProductImage: function (file, id) {
      var deferred = $q.defer();

      var ProductImages = new Parse.Object.extend('ProductImages');
      var image = new ProductImages();
      var fileFormat = file.type.split('/')[1];
      var name = id + '.' + fileFormat;

      var parseFile = new Parse.File(name, file);

      image.set('hires', parseFile);

      image
        .save()
        .then(function (image) {
          console.log('Querying object with ID ' + id);
          var query = new Parse.Query('Product');
          query
            .get(id)
            .then(function (product) {
              product.add('images', image);
              return product.save();
            }).then(function (product) {
              deferred.resolve(product);
            }, function (error) {
              deferred.resolve(error);
            });
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    },

    getImages: function (id) {
      var deferred = $q.defer();
      var query = new Parse.Query('ProductImages');
      query.get(id).then(function (image) {

        deferred.resolve({
          id: image.id,
          thumbnail: image.get('thumbnail').url()
        });
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    },

    deleteProductImage: function (product, id) {
      var deferred = $q.defer();

      var images = [];

      var productQuery = new Parse.Query('Product');
      productQuery
        .get(product)
        .then(function (product) {
          images = product.get('images');
          product.unset('images');
          return product.save();
        })
        .then(function (product) {
          var newImages = _.filter(images, function (image) {
            return image.id !== id;
          });
          _.each(newImages, function (i) {
            product.add('images', i);
          });

          return product.save();
        })
        .then(function (product) {
          var query = new Parse.Query('ProductImages');
          query
            .get(id)
            .then(function (image) {
              return image.destroy();
            })
            .then(function (image) {
              deferred.resolve(image);
            }, function (error) {
              deferred.reject(error);
            });
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    },

    deleteEmpties: function () {
      var deferred = $q.defer();

      cherokeeDB
        .open()
        .then(function () {
          console.log('clearing the db');
          cherokeeDB.products.clear();
        })
        .then(function () {
          deferred.resolve();
        })
        .catch(function (error) {
          console.error(error);
          deferred.reject(error);
        });

      return deferred.promise;
    },

    subscribe: function () {
      var query = new Parse.Query('Product');
      query.equalTo('vendor', vendor);
      subscription = query.subscribe();
      subscription.on('open', function () {
        console.log('Subscribed to product subscription');
      });
      stockService.productCreated();
    },

    unsubscribe: function () {
      console.log('subscription closed');
      if (subscription) {
        subscription.unsubscribe();
      }
    },

    productCreated: function () {
      subscription.on('create', function (feed) {
        console.log('product created');

        commonService.getCount('Product').then(function (count) {
          stockService.fetchToLocal(count).then(function (
            result) {
            $rootScope.$broadcast('info', {
              message: result.message
            });
            $rootScope.$broadcast('init-prod');
          }).catch(function (error) {
            $rootScope.$emit('danger', {
              message: 'Please logout and login again'
            });
          });
        });

        $rootScope.$broadcast('info', {
          message: 'New products added'
        });
      });
    },
  };

  return stockService;
});