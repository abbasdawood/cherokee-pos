var Dexie = require('dexie');

module.exports = dbConfig;

/** @ngInject */
function dbConfig($provide) {
  $provide.constant('Dexie', Dexie);
  var db = new Dexie('posDB');
  db.version(1).stores({
    products: 'id, *name',
    order: '++offlineId, *state, &id, total'
  });
  // $log.log('db created ');
}
