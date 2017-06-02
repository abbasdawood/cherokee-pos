function orderDetailsController() {
  this.text = 'My brand new component!';
}

module.exports = {
  template: require('./orderDetails.html'),
  controller: orderDetailsController
};

