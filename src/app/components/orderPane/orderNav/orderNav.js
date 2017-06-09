function orderNavController($scope, $log, $rootScope, orderService) {
  this.style = ['all', 'inStore', 'delivery', 'multi'];
  this.text = 'Order Navigation panel';
  var vo = this;
  this.id = [];
  this.state = [];
  this.total = [];
  this.selectTab = function (style) {
    $log.log(style);
    $rootScope.$broadcast('getorders', style);
  };

  vo.i = 0;
  vo.busy = false;
  this.pageLoad = function (argument) {
    // $log.log('page load text');
    if (vo.busy) {
      return;
    }
    vo.busy = true;
    orderService.getOrders((vo.i), 8, null, null, null, null, null, null, null)
    .then(function (orders) {
      angular.forEach(orders.data, function (element) {
        vo.orders.push(element);
       });
      vo.i++;
      vo.busy = false;
    })
    .catch(function (error) {
      $log.error(error);
    });
  };
  this.pageLoad();
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