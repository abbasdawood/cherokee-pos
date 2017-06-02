function orderNavController($scope, $log) {
  this.style = ['all', 'dine-in', 'delivery', 'multi'];
  this.selectTab = function (style) {
    $log.log(style);
    $scope.$emit('getorders', style);
  };
}
module.exports = {
  template: require('./orderNav.html'),
  controller: orderNavController
};