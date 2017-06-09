var angular = require('angular');
var hello = require('./app/hello');
var productNav = require('./app/components/productPane/productNav/productNav');
var productCategory = require(
  './app/components/productPane/productPanel/productCategory/productCategory'
);
var _ = require('lodash');
var productCart = require('./app/components/productCart/productCart');
var orderNav = require('./app/components/orderPane/orderNav/orderNav');
var login = require('./app/components/login/login');
// var Parse = require('parse');
var Parse = require('parse');
var routesConfig = require('./config/routes');
var dbConfig = require('./config/dbconfig');
var orderService = require('./app/services/order/orderService');
var StockService = require('./app/services/stock/stockService');
var authService = require('./app/services/auth/authService');
var commonService = require('./app/services/commonService/commonService');
var mainFrame = require('./app/components/mainFrame/mainFrame');
require('angular-filter');
require('angular-ui-router');
require('angular-ui-bootstrap');
require('bootstrap');
require('jquery');
require('ng-infinite-scroll');
require('angular-local-storage');
var Dexie = require('dexie');
require('./index.less');
var app = 'app';
module.exports = app;

Parse.initialize('MbAe6hoy43d3uInM0TISC1dBePxocl4eLL4B0Tig', 'bdKP5OkzKFPQt4RKURwhK7blDLTr6xScCxNuSPwY');
Parse.serverURL = 'http://192.168.1.3:1337/parse';

var db = new Dexie('cherokeeDB');
  db.version(1).stores({
    products: 'id, *name',
    order: '++offlineId, *state, &id, total'
  });

angular
  .module(app, ['ui.router', 'angular.filter', 'ui.bootstrap',
    'infinite-scroll', 'LocalStorageModule'
  ])
  .constant('cherokeeDB', db)
  .config(routesConfig)
  // .config(dbConfig)
  .component('app', hello)
  // .component('productNav', productNav)
  .component('productCategory', productCategory)
  // .component('orderNav', orderNav)
  .component('productCart', productCart)
  .component('login', login)
  .component('mainFrame', mainFrame)
  .service('StockService', StockService)
  .service('AuthService', authService)
  .service('CommonService', commonService)
  // .value('THROTTLE_MILLISECONDS', 250)
  .service('orderService', orderService);
