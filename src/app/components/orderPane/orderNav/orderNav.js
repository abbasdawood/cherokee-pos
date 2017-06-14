function orderNavController($scope, $log, $rootScope, OrderService, $uibModal) {
  var vm = this;
  this.style = ['all', 'inStore', 'delivery', 'multi'];
  this.selectedStyle = null;
  this.text = 'Order Navigation panel';
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
    if (vm.busy) {
      return;
    }
    vm.busy = true;

    OrderService.getOrders((vm.i), 8, null, null, null, null, null, vm.selectedStyle, null)
    .then(function (response) {
      $log.log('display' + response);
        vm.orders = response.data;
        angular.forEach(response.data, function (order) {
          vm.orders.push(order);
        });
      vm.i++;
      vm.busy = false;
    })
    .catch(function (error) {
      $log.error(error);
    });
  };
  this.pageLoad();

  this.changeStyle = function (style) {
    vm.i = 0;
    vm.orders = [];
    vm.selectedStyle = style === 'all' ? null : style;
    this.pageLoad();
  };

  this.selectOrder = function (order) {
    $log.log(order);
    $uibModal.open({
      size: 'lg',
      keyboard: false,
      templateUrl: 'app/components/orderPane/orderPanel/orderCard/orderCard.html',
      controller: 'orderCardController',
      resolve: {
        order: function () {
          return order;
        }
      }
    }).result.then(function (result) {
      // What happens when this modal is closed successfully
    }).catch(function (error) {
      // What happens if this is dismissed
    });
  };
}
module.exports = {
  template: require('./orderNav.html'),
  controller: orderNavController
};