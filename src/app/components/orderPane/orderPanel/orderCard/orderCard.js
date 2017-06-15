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
    $scope.updateOrderItems = function (index) {
        OrderService
            .updateOrderItems(
                $scope.list[index].orderId,
                $scope.list[index].itemId,
                $scope.list[index].quantity,
                null,
                null,
                null)
            .then(function (response) {
                $log.log(response.data);
                // $scope.getItems();
            })
            .catch(function (error) {
                $log.log('update order error' + error);
            });
    };
    $scope.modify = function (index, action) {

        if (action === 'add') {
            $scope.list[index].quantity++;
        } else if ($scope.list[index].quantity > '0') {
            $scope.list[index].quantity--;
        }

    };

    // $scope.itemId = [];
    // $scope.addItems = function () {
    //     OrderService
    //         .addOrderItems(order.itemId, null)
    //         .then(function (response) {
    //             angular.forEach(response.data, function (item) {
    //                 $scope.item.push(item);
    //                 $log.log('additem');
    //             });
    //         })
    //         .catch(function (error) {
    //             $log.log(error);
    //         });
    // };

    // $scope.removeItem = function (itemId) {
    //     OrderService
    //         .removeOrderItem(itemId, null)
    //         .then(function (response) {
    //             $log.log('deleted ' + response.data.id);
    //             $scope.getItems();
    //         })
    //         .catch(function (error) {
    //             $log.log(error);
    //         });
    // };
}
module.exports = orderCardController;
