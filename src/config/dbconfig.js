// var localforage = require('localforage');
/** @ngInject */
function dbConfig(localforage) {
  localforage.config({
    // driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
    name: 'cherokeeDB',
    version: 1.0,
    size: 9980736, // Size of database, in bytes. WebSQL-only for now.
    // storeName: 'products', // Should be alphanumeric, with underscores.
    description: 'some description'
  });
  localforage.setDriver(localforage.INDEXEDDB);
  // ENV.lf.setItem('id', 'value: DOMString');
}
module.exports = dbConfig;
