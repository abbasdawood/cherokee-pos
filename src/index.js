var angular = require('angular');
var hello = require('./app/hello');
var productNav = require('./app/components/productPane/productNav/productNav');
var productCategory = require(
  './app/components/productPane/productPanel/productCategory/productCategory'
);
var productCart = require('./app/components/productCart/productCart');
var orderNav = require('./app/components/orderPane/orderNav/orderNav');
require('angular-filter');
require('angular-ui-router');
require('angular-ui-bootstrap');
require('bootstrap');
require('jquery');
var routesConfig = require('./routes');

require('./index.less');

var app = 'app';
module.exports = app;

angular
  .module(app, ['ui.router', 'angular.filter', 'ui.bootstrap'])
  .config(routesConfig)
  .component('app', hello)
  .component('productNav', productNav)
  .component('productCategory', productCategory)
  .component('orderNav', orderNav)
  .component('productCart'.productCart);