function orderCardController($scope, $log, $rootScope, OrderService, orderId) {
  this.text = 'order card!';
  this.id = orderId;
  $log.log(orderId);
  $log.log('ordermodal');
}

module.exports = orderCardController;

