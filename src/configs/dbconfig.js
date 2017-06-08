module.exports = dbConfig;

/** @ngInject */
function dbConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $provide.constant('Dexie', window.Dexie);
  var db = new Dexie('posDB');

  db.version(0.1).stores({
    products: 'id, *name',
    order:'++offlineId, *state, &id, total'
  });
}
