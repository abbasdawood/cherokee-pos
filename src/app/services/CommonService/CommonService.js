var Parse = require('parse');

function CommonService(localStorageService, $q, $log) {
  return {
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
