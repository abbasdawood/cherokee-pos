var angular = require('angular');

var hello = require('./app/hello');
var myComponent = require('./app/components/game/myComponent');
var productCategory = require(
  './app/components/productPane/productPanel/productCategory/productCategory'
);

require('angular-ui-router');
var routesConfig = require('./routes');

require('./index.less');

var app = 'app';
module.exports = app;

angular
  .module(app, ['ui.router'])
  .config(routesConfig)
  .component('app', hello)
  .component('myComponent', myComponent)
  .component('productCategory', productCategory);