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
require('angular-filter');
require('angular-ui-router');
require('angular-ui-bootstrap');
require('bootstrap');
require('jquery');
require('ng-infinite-scroll');
require('angular-local-storage');
var routesConfig = require('./configs/routes');
var orderService = require('./app/services/order/orderService');
var stockService = require('./app/services/stock/stockService');
var authService = require('./app/services/auth/authService');
var commonService = require('./app/services/commonService/commonService');
var mainFrame = require('./app/components/mainFrame/mainFrame');
require('./index.less');
var app = 'app';
module.exports = app;

Parse.initialize('MbAe6hoy43d3uInM0TISC1dBePxocl4eLL4B0Tig', 'bdKP5OkzKFPQt4RKURwhK7blDLTr6xScCxNuSPwY');
Parse.serverURL = 'http://192.168.1.2:1337/parse';

angular
  .module(app, ['ui.router', 'angular.filter', 'ui.bootstrap',
    'infinite-scroll', 'LocalStorageModule'
  ])
  .config(routesConfig)
  .component('app', hello)
  // .component('productNav', productNav)
  .component('productCategory', productCategory)
  // .component('orderNav', orderNav)
  .component('productCart', productCart)
  .component('login', login)
  .component('mainFrame', mainFrame)
  .service('stockService', stockService)
  .service('AuthService', authService)
  .service('CommonService', commonService)
  // .value('THROTTLE_MILLISECONDS', 250)
  .service('orderService', orderService);
