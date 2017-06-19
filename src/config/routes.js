module.exports = routesConfig;
var Parse = require('parse');
/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/app');
  $stateProvider.state('app', {
    url: '/app',
    component: 'app'
  });
  $stateProvider.state('app.login', {
    url: '/login',
    component: 'login'
  });
  $stateProvider.state('app.mainframe', {
    url: '/main',
    component: 'mainFrame'
  });
}
