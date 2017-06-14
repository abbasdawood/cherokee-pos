function orderCardController($scope, $log, $rootScope, OrderService, order, $uibModalInstance) {
    $scope.text = 'JS order card!';
    $scope.id = order.id;
    $scope.style = order.style;
    $log.log(order.id);
    $log.log(order.style);
    $log.log('ordermodal');


    $scope.getItems = function () {
        $scope.list = [];

        OrderService
            .getOrderItems(order.id, null)
            .then(function (response) {
                angular.forEach(response.data, function (item) {
                    $scope.list.push(item);
                });
            })
            .catch(function (error) {
                $log.error(error);
            });
    };
    $scope.getItems();

    $scope.itemId = [];
    $scope.addItems = function () {
        OrderService
            .addOrderItems(order.itemId, null)
            .then(function (response) {
                angular.forEach(response.data, function (item) {
                    $scope.item.push(item);
                    $log.log('additem');
                });
            })
            .catch(function (error) {
                $log.log(error);
            });
    };
    $scope.removeItem = function (itemId) {
        OrderService
            .removeOrderItem(itemId, null)
            .then(function (response) {
                $log.log('deleted ' + response.data.id);
                $scope.getItems();
            })
            .catch(function (error) {
                $log.log(error);
            });
    };
}

module.exports = orderCardController;
