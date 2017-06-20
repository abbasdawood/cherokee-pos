var Parse = require('parse');

function AuthService($q, $http, localStorageService, $log) {
  var ENDPOINT = '/auth/';
  var ENV = {
    serverURL: 'http://192.168.1.8:1337'
  };
  return {
    signUp: function (user) {

      var u = new Parse.User();

      u.set('username', user.phone);
      u.set('email', user.email);
      u.set('name', user.name);
      u.set('password', user.password);
      u.set('phone', user.phone);
      u.set('role', 'BOSS');
      u.set('brand', user.brand.toLowerCase());
      u.set('keys', user.keys);
      u.set('type', user.type);
      _.each(['dashboard', 'base', 'reports', 'settings', 'productEdit',
        'addProduct', 'createOffer'
      ], function (item) {
        u.addUnique('access', item);
      });

      return u.signUp();
    },
    logIn: function (user) {
      var deferred = $q.defer();

      var u;

      Parse.User
        .logIn(user.username.toString(), user.password)
        .then(function (user) {
          u = user;
          return $http.post(ENV.serverURL + ENDPOINT + 'createSession', {
            id: user.id
          });
        })
        .then(function (response) {
          localStorageService.set('token', response.data.token);
          $http.defaults.headers.post['x-access-token'] = response.data.token;
          deferred.resolve(u);
        })
        .catch(function (error) {
          $log.error(error);
          deferred.reject(error);
        });

      return deferred.promise;
    },

    addPreference: function (preferences) {

      var u = new Parse.User();

      u.set('keys', preferences);

      return u.save();
    },

    getCategories: function () {
      var deferred = $q.defer();

      var categories = Parse.User.current().get('categories');

      if (categories && categories.length) {
        deferred.resolve(categories);
      } else {
        deferred.resolve([]);
      }

      return deferred.promise;
    },

    saveCategories: function (categories) {
      $log.log(categories);
      var deferred = $q.defer();

      var query = new Parse.Query(Parse.User);
      query.get(Parse.User.current().id).then(function (user) {
        user.unset('categories');
        _.each(categories, function (c) {
          user.addUnique('categories', c);
        });
        return user.save();
      }).then(function (user) {
        deferred.resolve(user.id);
      }).catch(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    },

    checkBusinessName: function (name) {
      var deferred = $q.defer();

      var query = new Parse.Query(Parse.User);
      query.equalTo('brand', name);
      query.find().then(function (user) {
        if (user.length) {
          $log.log(user);
          deferred.resolve(true);
        } else {
          deferred.resolve(false);
        }
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    },

    checkRegistration: function () {
      var deferred = $q.defer();
      var currentUser = Parse.User.current();

      if (currentUser) {
        deferred.resolve(true);
      } else {
        deferred.reject({
          code: 1001,
          message: 'User has not signed in'
        });
      }

      return deferred.promise;
    },

    logout: function () {
      var deferred = $q.defer();
      Parse.User.logOut().then(function () {
          // PermRoleStore.clearStore();
          // PermPermissionStore.clearStore();
          localStorageService.remove('token');
          localStorageService.remove('taxes');
          localStorageService.remove('colors');
          deferred.resolve(true);
        })
        .catch(function (error) {
          $log.error(error);
          deferred.reject(error);
        });


      return deferred.promise;
    },

    checkBrandName: function (username) {
      var deferred = $q.defer();

      var query = new Parse.Query(Parse.User);
      if (username) {
        query.equalTo('username', username);
      }

      query.first().then(function (user) {
        if (user) {
          deferred.resolve({
            hash: user.get('keys').vendorKey,
            name: user.get('name').first
          });
        } else {
          deferred.resolve(false);
        }
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    },

    // generateProfileImage: function (hash, size) {
    //   var options = {
    //     background: '#' + hash.substring(1, 7),
    //     size: size
    //   };
    //   // var data = new Identicon(hash, options).toString();

    //   angular.element('.brand-image').css('background-image',
    //     'url(data:image/png;base64,' + data + ')');
    //   angular.element('.profile-picture,.profile-picture-frame').css(
    //     'background-image',
    //     'url(data:image/png;base64,' + data + ')');
    // },

    retrieveUser: function () {

      var deferred = $q.defer();
      var user = {};
      var pUser = Parse.User.current();

      if (pUser) {
        var url = pUser.get('logo') ? pUser.get('logo').url() : null;
        url = url ? url.replace(/^http:\/\//i, '//') : null;
        user.id = pUser.id;
        user.name = {};
        user.name.first = pUser.get('name').first;
        user.name.last = pUser.get('name').last;
        user.phone = pUser.get('phone');
        user.brand = pUser.get('brand');
        user.role = pUser.get('role');
        user.brandDisplay = pUser.get('brandDisplay');
        user.address = pUser.get('address');
        user.smsCredits = pUser.get('smsCredits');
        user.billingInfo = pUser.get('billingInfo') || [];
        user.logo = url;
        deferred.resolve(user);

      } else {
        deferred.reject({
          message: 'No user signed in'
        });
      }
      return deferred.promise;
    },

    addLogo: function (file) {
      var deferred = $q.defer();
      if (Parse.User.current()) {
        var fileFormat = file.type.split('/')[1];
        var name = Parse.User.current().get('brand') + '.' + fileFormat;

        var logo = new Parse.File(name, file);

        var query = new Parse.Query(Parse.User);
        query
          .get(Parse.User.current().id)
          .then(function (user) {
            user.set('logo', logo);
            return user.save();
          })
          .then(function (user) {
            deferred.resolve(user);
          }, function (error) {
            deferred.reject(error);
          });
      } else {
        deferred.reject({
          code: 1001,
          message: 'User has not signed in'
        });
      }

      return deferred.promise;
    },

    removeLogo: function () {
      var deferred = $q.defer();

      if (Parse.User.current()) {
        $http
          .delete(ENV.serverURL + '/account/logo/' + Parse.User.current().id, {
            headers: {
              'x-access-token': localStorageService.get('token')
            }
          })
          .then(function (response) {
            deferred.resolve(response.data);
          }, function (response) {
            deferred.reject(response.data);
          });

      } else {
        deferred.reject({
          code: 1001,
          message: 'User has not signed in'
        });
      }

      return deferred.promise;
    },

    getKeys: function () {
      var deferred = $q.defer();
      var currentUser = Parse.User.current();

      if (currentUser) {
        $log.log('User here, getting keys');
        var query = new Parse.Query('UserKeys');
        query.equalTo('vendor', currentUser.get('keys').vendorKey);
        query
          .first()
          .then(function (key) {
            if (key) {
              $log.log('got some key..');
              $log.log(key);
              var instamojo, sendgrid = {};

              deferred.resolve({
                instamojo: {
                  salt: key.get('instamojo') || null,
                  apiKey: key.get('instamojoApiKey') || null,
                  authToken: key.get('instamojoAuthToken') || null
                },
                sendgrid: {
                  name: key.get('sendgridName') || null,
                  sender: key.get('sendgridSender') || null,
                  password: key.get('sendgridKey') || null,
                  user: key.get('sendgridUser') || null
                },
                charges: {
                  deliveryCharge: key.get('deliveryCharge') || null,
                  reminderThreshold: key.get('reminderThreshold') ||
                    null
                }
              });
            } else {
              deferred.reject({
                code: 404,
                message: 'No keys exist'
              });
            }

          }, function (error) {
            deferred.reject(error);
          });

      }

      return deferred.promise;
    },

    saveIMojo: function (instamojo) {
      var deferred = $q.defer();
      var currentUser;

      var saveKey = function (key) {
        /* ----------  Set other keys as necessary  ---------- */
        key.set('instamojo', instamojo.salt || null);
        key.set('instamojoApiKey', instamojo.apiKey || null);
        key.set('instamojoAuthToken', instamojo.authToken || null);
        key.set('vendor', currentUser.get('keys').vendorKey);
        key.save().then(function (k) {
          $log.log('key has been saved...');
          deferred.resolve(k);
        }, function (error) {
          $log.log('key not saved...');
          deferred.reject(error);
        });
      };


      currentUser = Parse.User.current();

      if (currentUser) {
        var query = new Parse.Query('UserKeys');
        query.equalTo('vendor', currentUser.get('keys').vendorKey);
        query
          .first()
          .then(function (key) {
            if (key) {
              $log.log('existing key found');
              /* Save the key */
              saveKey(key);
            } else {
              /* ----------  Have to create a new object  ---------- */
              $log.log('existing key not found');

              var UserKey = Parse.Object.extend('UserKeys');
              var userKey = new UserKey();

              saveKey(userKey);
            }
          }, function (error) {
            deferred.reject(error);
          });

      } else {
        deferred.reject({
          message: 'No user signed in'
        });
      }


      return deferred.promise;
    },

    saveSendGrid: function (sendgrid) {
      var deferred = $q.defer(),
        currentUser;

      var saveKey = function (key) {
        /* ----------  Set other keys as necessary  ---------- */
        key.set('sendgridUser', sendgrid.user || null);
        key.set('sendgridKey', sendgrid.password || null);
        key.set('sendgridSender', sendgrid.sender || null);
        key.set('sendgridName', sendgrid.name || null);
        key.set('vendor', currentUser.get('keys').vendorKey);
        key.save().then(function (k) {
          $log.log('key has been saved...');
          deferred.resolve(k);
        }, function (error) {
          $log.log('key not saved...');
          deferred.reject(error);
        });
      };


      currentUser = Parse.User.current();

      if (currentUser) {
        var query = new Parse.Query('UserKeys');
        query.equalTo('vendor', currentUser.get('keys').vendorKey);
        query
          .first()
          .then(function (key) {
            if (key) {
              $log.log('existing key found');
              /* Save the key */
              saveKey(key);
            } else {
              /* ----------  Have to create a new object  ---------- */
              $log.log('existing key not found');

              var UserKey = Parse.Object.extend('UserKeys');
              var userKey = new UserKey();

              saveKey(userKey);
            }
          }, function (error) {
            deferred.reject(error);
          });

      }


      return deferred.promise;
    },

    saveCharges: function (charges) {
      var deferred = $q.defer(),
        currentUser;

      var saveKey = function (key) {
        /* ----------  Set other keys as necessary  ---------- */
        key.set('deliveryCharge', parseFloat(charges.deliveryCharge) ||
          null);
        key.set('reminderThreshold', parseFloat(charges.reminderThreshold) ||
          null);
        key.set('vendor', currentUser.get('keys').vendorKey);
        key.save().then(function (k) {
          $log.log('key has been saved...');
          deferred.resolve(k);
        }, function (error) {
          $log.log('key not saved...');
          deferred.reject(error);
        });
      };


      currentUser = Parse.User.current();

      if (currentUser) {
        var query = new Parse.Query('UserKeys');
        query.equalTo('vendor', currentUser.get('keys').vendorKey);
        query
          .first()
          .then(function (key) {
            if (key) {
              $log.log('existing key found');
              /* Save the key */
              saveKey(key);
            } else {
              /* ----------  Have to create a new object  ---------- */
              $log.log('existing key not found');

              var UserKey = Parse.Object.extend('UserKeys');
              var userKey = new UserKey();

              saveKey(userKey);
            }
          }, function (error) {
            deferred.reject(error);
          });

      }


      return deferred.promise;
    },

    // getPermissions: function () {
    //   var deferred = $q.defer();

    //   var currentUser = Parse.User.current();
    //   if (currentUser) {
    //     var accessArray = currentUser.get('access');
    //     if (accessArray && accessArray.length) {
    //       deferred.resolve({
    //         id: currentUser.id,
    //         accessArray: accessArray,
    //         role: currentUser.get('role')
    //       });
    //     } else {
    //       deferred.reject(false);
    //     }
    //   } else {
    //     deferred.reject(false);
    //   }

    //   return deferred.promise;
    // },

    // setPermission: function (state, on, id) {

    //   return Parse
    //     .Cloud
    //     .run('changeAccess', {
    //       id: id,
    //       state: state,
    //       on: on
    //     })
    // },

    getWorkers: function (includeBOSS) {
      $log.log('getting workers...');
      var deferred = $q.defer();
      var accessList = [];

      var query = new Parse.Query(Parse.User);
      if (!includeBOSS) {
        query.equalTo('role', 'worker');
      }
      if (Parse.User.current()) {
        query.equalTo('brand', Parse.User.current().get('brand'));
      }

      query.find().then(function (workers) {
        if (workers && workers.length) {
          var list = [];
          _.each(workers, function (worker) {
            var accessArray = worker.get('access') || [];

            _.each(accessArray, function (item) {
              var obj = {
                state: item,
                access: true
              };

              accessList.push(obj);
            });

            list.push({
              id: worker.id,
              name: worker.get('name').first + ' ' + worker.get(
                'name').last,
              access: accessList,
              role: worker.get('role')
            });
          });
          $log.log(list);
          deferred.resolve(list);
        } else {
          deferred.reject({
            message: 'No workers found'
          });
        }
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    },

    getTaxes: function () {
      var deferred = $q.defer();

      if (Parse.User.current()) {
        var vendor = Parse.User.current().get('keys').vendorKey;

        $http
          .get(ENV.serverURL + '/account/taxes/' + vendor + '?token=' +
            localStorageService.get('token'))
          .then(function (response) {
            var taxes = response.data || [];
            // _.each(taxes, function (tax) {
            //   tax.selected = tax.default ? true : false;
            // });
            deferred.resolve(taxes);
          }, function (response) {
            $log.log(response);
            deferred.reject(response.data);
          });
      } else {
        deferred.reject({
          message: 'No user signed in'
        });
      }
      return deferred.promise;
    },

    createTax: function (tax) {
      var deferred = $q.defer();

      if (Parse.User.current()) {

        var vendor = Parse.User.current().get('keys').vendorKey;

        var newTax = {
          taxName: tax.name,
          taxPercent: parseFloat(tax.percent),
          taxDefault: tax.default
        };

        $http
          .post(ENV.serverURL + '/account/tax/' + vendor, newTax)
          .then(function (response) {
            deferred.resolve(response.data);
          }, function (response) {
            deferred.reject(response.data);
          });
      } else {
        deferred.reject({
          code: 404,
          message: 'No user signed in'
        });
      }

      return deferred.promise;
    },
    updateTax: function (tax) {
      var newTax = {
        taxName: tax.name,
        taxPercent: parseFloat(tax.percent),
        taxDefault: tax.default
      };

      return $http
        .put(ENV.serverURL + '/account/tax/' + tax.id, newTax);
    },

    deleteTax: function (id) {
      return $http.delete(ENV.serverURL + '/account/tax/' + id, {
        headers: {
          'x-access-token': localStorageService.get('token')
        }
      });
    },

    updateProfile: function (billingInfo) {
      var deferred = $q.defer();
      var currentUser = Parse.User.current();
      if (currentUser) {
        var query = new Parse.Query(Parse.User);
        query.get(currentUser.id).then(function (user) {
            user.unset('billingInfo');
            _.each(billingInfo, function (info) {
              var obj = {
                name: info.name,
                data: info.data
              };
              user.addUnique('billingInfo', obj);
            });
            return user.save();
          }).then(function (user) {
            deferred.resolve(user.id);
          })
          .catch(function (error) {
            deferred.reject(error);
          });
      } else {
        deferred.reject({
          message: 'No user signed in'
        });
      }

      return deferred.promise;
    },

    changePassword: function (phone) {
      var deferred = $q.defer();

      var query = new Parse.Query(Parse.User);
      query.equalTo('username', phone.toString());
      query.first().then(function (user) {
        if (!user) {
          deferred.reject({
            message: 'That\'s not a valid username'
          });
        } else {
          // Reset the password here
          $http.post(ENV.serverURL + ENDPOINT + 'forgot/' + phone).then(
            function (success) {
              deferred.resolve();
            },
            function (error) {
              deferred.reject(error);
            });
        }
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }
  };
}

AuthService.prototype.getData = function () {
  return 1 + 2;
};

module.exports = AuthService;
