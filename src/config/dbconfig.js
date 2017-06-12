// var localforage = require('localforage');
/** @ngInject */
function dbConfig(localforage) {
  localforage.config({
    driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
    name: 'cherokeeDB',
    version: 1.0,
    size: 9980736, // Size of database, in bytes. WebSQL-only for now.
    storeName: 'products', // Should be alphanumeric, with underscores.
    description: 'some description'
  });
  // localforage.setItem('key', 'value').then(function () {
  //   return localforage.getItem('key');
  // }).then(function (value) {
  //   $log.log(value);
  // }).catch(function (err) {
  //   // we got an error
  // });

}
module.exports = dbConfig;
