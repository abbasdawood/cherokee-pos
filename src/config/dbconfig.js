var Dexie = require('dexie');
/** @ngInject */
function dbConfig($provide) {
  $provide.constant('Dexie', window.Dexie);
  var db = new Dexie('cherokeeDB');

  db.version(1).stores({
    products: 'id, *name',
    order: '++offlineId, *state, &id, total'
  });
  // $log.log('db created ');
  $provide.constant('cherokeeDB', db);

}
module.exports = dbConfig;
