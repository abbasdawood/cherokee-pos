var angular = require('angular');
var hello = require('./app/hello');
var productNav = require('./app/components/productPane/productNav/productNav');
var productCategory = require(
    './app/components/productPane/productPanel/productCategory/productCategory'
);
var _ = require('lodash');
var productCart = require('./app/components/productCart/productCart');
var orderNav = require('./app/components/orderPane/orderNav/orderNav');
var sideNav = require('./app/components/sideNav/sideNav');
var login = require('./app/components/login/login');
var Parse = require('parse');
var localforage = require('localforage');
var routesConfig = require('./config/routes');
// var dbConfig = require('./config/dbconfig');
var OrderService = require('./app/services/Order/OrderService');
var StockService = require('./app/services/Stock/StockService');
var AuthService = require('./app/services/Auth/AuthService');
var CommonService = require('./app/services/CommonService/CommonService');
var mainFrame = require('./app/components/mainFrame/mainFrame');
var orderCard = require('./app/components/orderPane/orderPanel/orderCard/orderCard');
require('angular-filter');
require('angular-ui-router');
require('angular-ui-bootstrap');
require('bootstrap');
require('jquery');
require('moment');
require('ng-infinite-scroll');
require('angular-local-storage');
// var Dexie = require('dexie');
require('./index.less');
var app = 'app';
module.exports = app;

Parse.initialize('MbAe6hoy43d3uInM0TISC1dBePxocl4eLL4B0Tig', 'bdKP5OkzKFPQt4RKURwhK7blDLTr6xScCxNuSPwY');
Parse.serverURL = 'http://192.168.1.5:1337/parse';

localforage.setDriver(localforage.INDEXDDB);
var localOrders = localforage.createInstance({
    name: 'ordersDB',
    storeName: 'orders'
});
var localProducts = localforage.createInstance({
    name: 'localProducts',
    storeName: 'Products'
});


angular
    .module(app, ['ui.router', 'angular.filter', 'ui.bootstrap',
        'infinite-scroll', 'LocalStorageModule'
    ])
    .constant('lf', {OrdersDb: localOrders, ProductsDb: localProducts})
    .config(routesConfig)
    // .config(dbConfig)
    .component('app', hello)
    .component('productCategory', productCategory)
    .component('orderNav', orderNav)
    .component('sideNav', sideNav)
    .component('productCart', productCart)
    .component('login', login)
    .component('mainFrame', mainFrame)
    .controller('orderCardController', orderCard)
    .service('StockService', StockService)
    .service('AuthService', AuthService)
    .service('CommonService', CommonService)
    .service('OrderService', OrderService);
