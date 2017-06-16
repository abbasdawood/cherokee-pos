var Parse = require('parse');

function CommonService(localStorageService, $q, $log) {
  return {
    getCount: function (queryClass, equalToCol, equalToVal, containedInCol, containedIn, dontUseVendor) {
      var deferred = $q.defer();

      var query = new Parse.Query(queryClass);
      if (Parse.User.current()) {
        if (!dontUseVendor) {
          $log.info('using vendorKey');
          query.equalTo('vendor', Parse.User.current().get('keys').vendorKey);
        }
        if (containedInCol && containedIn) {
          query.containedIn(containedInCol, containedIn);
        }
        if (_.isArray(equalToCol) && _.isArray(equalToVal)) {
          _.each(equalToCol, function (column, index) {
            if (equalToVal[index]) {
              query.equalTo(column, equalToVal[index]);
            } else if (_.isNull(equalToVal[index])) {
              query.doesNotExist(column);
            }
          });
        } else {
          if (equalToCol && equalToVal) {
            if (equalToVal) {
              query.equalTo(equalToCol, equalToVal);
            } else {
              query.doesNotExist(equalToCol);
            }
          } else {
            $log.log(' ');
          }
        }

        // if (Offline.state === 'up') {
        query.count()
          .then(function (count) {
            deferred.resolve(count);
          }, function (error) {
            deferred.reject(error);
          });
        // } else {
        // deferred.resolve(50);
        // }

      } else {
        deferred.reject({message: 'No user signed in'});
      }

      return deferred.promise;
    },
    getPaymentModes: function () {
      var deferred = $q.defer();
      var modes = [],
        wallets = [],
        prepaids = [],
        cards = [];

      Parse.Config.get().then(function (config) {
          _.each(config.get('paymentModes'), function (mode) {
            modes.push({
              name: mode
            });
          });

          _.each(config.get('wallets'), function (wallet) {
            wallets.push({
              name: wallet
            });
          });

          _.each(config.get('prepaids'), function (prepaid) {
            prepaids.push({
              name: prepaid
            });
          });

          _.each(config.get('cards'), function (card) {
            cards.push({
              name: card
            });
          });

          deferred.resolve({
            modes: modes,
            wallets: wallets,
            prepaids: prepaids,
            cards: cards
          });
        })
        .catch(function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    },
    getColors: function () {
      var deferred = $q.defer();
      var colors = [];

      Parse.Config.get().then(function (config) {
          _.each(config.get('colors'), function (color) {
            colors.push(color);
          });
          deferred.resolve(colors);
        })
        .catch(function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    },

    getStates: function () {
      var deferred = $q.defer();
      var states = [];

      // if (Offline.state === 'up') {
      Parse.Config.get().then(function (config) {
          var list = [];
          states = config.get('states');
          _.each(states, function (i) {
            list.push({
              state: i.state,
              description: i.description
            });
          });

          deferred.resolve(list);
        })
        .catch(function (error) {
          deferred.reject(error);
        });
      // } else {
      //   angular.fromJson.parse(localStorageService.get('states'));
      // }

      return deferred.promise;
    },
    serialize: function (obj) {
      var str = [];
      for (var p in obj) {
        if ('p' in obj && p) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
      }
      $log.log(str.join('&'));
      return str.join('&');
    }
  };
}

CommonService.prototype.getData = function () {
  return 1 + 2;
};
module.exports = CommonService;
