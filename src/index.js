var angular = require('angular');
var hello = require('./app/hello');
var productNav = require('./app/components/productPane/productNav/productNav');
var productCategory = require(
  './app/components/productPane/productPanel/productCategory/productCategory'
);
var _ = require('lodash');
var productCart = require('./app/components/productCart/productCart');
var orderNav = require('./app/components/orderPane/orderNav/orderNav');
require('angular-filter');
require('angular-ui-router');
require('angular-ui-bootstrap');
require('bootstrap');
require('jquery');
require('ng-infinite-scroll');
var routesConfig = require('./routes');
var orderService = require('./app/services/order/orderService');
var stockService = require('./app/services/stock/stockService');
require('./index.less');
var app = 'app';
module.exports = app;

angular
  .module(app, ['ui.router', 'angular.filter', 'ui.bootstrap',
    'infinite-scroll'
  ])
  .config(routesConfig)
  .component('app', hello)
  .component('productNav', productNav)
  .component('productCategory', productCategory)
  // .component('orderNav', orderNav)
  .component('productCart', productCart)
  .service('stockService', stockService)
  // .value('THROTTLE_MILLISECONDS', 250)
  .service('orderService', orderService);