require('jquery');
// require('bootstrap-loader');
require('bootstrap');
var angular = require('angular');

var hello = require('./app/hello');
var orderNav = require('./app/components/orderPane/orderNav/orderNav');

require('angular-ui-router');
require('angular-ui-bootstrap');
var routesConfig = require('./routes.js');

require('./index.less');

var app = 'app';
module.exports = app;

angular
  .module(app, ['ui.router', 'ui.bootstrap'])
  .config(routesConfig)
  .component('app', hello)
  .component('orderNav', orderNav);