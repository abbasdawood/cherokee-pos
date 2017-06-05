var angular = require('angular');
var hello = require('./app/hello');
var myComponent = require('./app/components/game/myComponent');
var productNav = require('./app/components/productPane/productNav/productNav');
var productCategory = require(
  './app/components/productPane/productPanel/productCategory/productCategory'
);
require('angular-filter');
require('angular-ui-router');
var routesConfig = require('./routes');

require('./index.less');

var app = 'app';
module.exports = app;

angular
  .module(app, ['ui.router', 'angular.filter'])
  .config(routesConfig)
  .component('app', hello)
  .component('myComponent', myComponent).component('productNav', productNav)
  .component('productCategory', productCategory);