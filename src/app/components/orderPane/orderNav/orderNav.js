function orderNavController($scope, $log, $rootScope, orderService) {
  this.style = ['all', 'inStore', 'delivery', 'multi'];
  this.text = 'Order Navigation panel';
  var vo = this;
  $scope.$on('getorders', function (event, style) {
    var orderStyle = style;
    vo.id = [];
    vo.state = [];
    vo.total = [];
    angular.forEach(orderService.getData(), function (element) {
      if (orderStyle === element.style) {
        vo.id.push(element);
        vo.state.push(element);
      }
    });
  });
  this.selectTab = function (style) {
    $log.log(style);
    $rootScope.$broadcast('getorders', style);
  };
}
/* *
this.putOrder = function(style) {
  orderService.getData()
  .then(function(response){
    $log.log(response.data[0]);
    vm.orders = response.data;
  }).catch(function(error){
    $log.error(error);
  });
};
 * */

module.exports = {
  template: require('./orderNav.html'),
  controller: orderNavController
};