function orderNavController($scope, $log, $rootScope, OrderService, $uibModal, $location) {
    var vm = this;
    this.style = ['inStore', 'delivery', 'multi', 'Credit'];
    this.selectedStyle = null;
    this.reference = '0';
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
        OrderService
            .getOrders((vm.i), 8, null, null, null, null, null, vm.selectedStyle, null)
            .then(function (response) {
                $log.log('display' + response);
                // vm.orders = response.data;
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
    $log.log('page load text2');

    this.changeStyle = function (style) {
        vm.i = 0;
        vm.orders = [];
        vm.selectedStyle = style === 'all' ? null : style;
        this.pageLoad();
        $log.log('page changeStyle text');

    };
    this.new = false;
    this.createOrder = function (newStyle) {
            $log.log(vm.newStyle);
        OrderService
            .createOrder(newStyle)
            .then(function (response) {
                $log.log(response);
                // $location.search('order', response.data.objectId);
                // // vm.orders.id = response.data.objectId;
                // vm.orders.unshift(response.data);
            })
            .catch(function (error) {
                $log.error(error);
            });
    };
    this.selectOrder = function (order) {
        $log.log(order);
        $uibModal.open({
            size: 'lg',
            keyboard: false,
            // backdrop: false,
            templateUrl: 'app/components/orderPane/orderPanel/orderCard/orderCard.html',
            controller: 'orderCardController',
            resolve: {
                order: function () {
                    return order;
                }
            }
        }).result.then(function (orderId) {
            $location.search('order', orderId);
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
