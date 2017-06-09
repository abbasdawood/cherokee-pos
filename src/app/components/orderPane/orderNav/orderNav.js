function orderNavController($scope, $log, $rootScope, OrderService) {
  this.style = ['all', 'inStore', 'delivery', 'multi'];
  this.selectedStyle = null;
  this.text = 'Order Navigation panel';
  var vm = this;
  this.id = [];
  this.state = [];
  this.total = [];
  this.orders = [];
  // this.selectTab = function (style) {
  //   $log.log(style);
  //   $rootScope.$broadcast('getorders', style);
  // };

  vm.i = 0;
  vm.busy = false;
  this.pageLoad = function () {
    $log.log('page load text');
    // if (vm.busy) {
    //   return;
    // }
    // vm.busy = true;
    OrderService.getOrders((vm.i), 8, null, null, null, null, null, vm.selectedStyle, null)
    .then(function (response) {
      $log.log('display' + response);
      vm.orders = response.data;
      // angular.forEach(response.data, function (order) {
      //   vm.orders.push(order);
      //  });
      // vm.i++;
      // vm.busy = false;
    })
    .catch(function (error) {
      $log.error(error);
    });
  };
  // this.pageLoad();

  this.changeStyle = function (style) {
    vm.i = 0;
    vm.orders = [];
    vm.selectedStyle = style === 'all' ? null : style;
    this.pageLoad();
  };
}
module.exports = {
  template: require('./orderNav.html'),
  controller: orderNavController
};