function productCartController($scope, $log) {
  this.text = 'This is cart!';
  this.cart = [];
  var vm = this;
  var objfound = {};
  $scope.$on('itemObj', function (event, obj) {
    var id = obj.id;
    $log.log('recieved in cart ' + obj.id);
    // $log.log(vm.cart);
    if (vm.cart.length) {
      objfound = _.find(vm.cart,  function (o)  { 
        return  id === o.id; 
      });
      $log.log('Object found in cart, incrementing it..');
      objfound.qty++;
      $log.log(objfound.name + ' ' + objfound.qty);
    } else {
      $log.log('object not found adding it');
      obj.qty = 1;
      vm.cart.push(obj);
      $log.log('object added successfully');
    }
  });

  $log.log(vm.cart);
}

module.exports = {
  template: require('./productCart.html'),
  controller: productCartController
};