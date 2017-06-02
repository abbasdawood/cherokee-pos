var angular = require('angular');

var hello = require('./app/hello');
var myComponent = require('./app/components/game/myComponent');
var orderNav = require('./app/components/orderPane/orderNav/orderNav');

require('angular-ui-router');
require('ui.bootstrap');
var routesConfig = require('./routes');

require('./index.less');

var app = 'app';
module.exports = app;

angular
  .module(app, ['ui.router', 'ui-bootstrap'])
  .config(routesConfig)
  .component('app', hello)
  .component('myComponent', myComponent)
  .component('orderNav', orderNav);