function orderCardController() {
  this.text = 'My brand new component!';
}

module.exports = {
  template: require('./orderCard.html'),
  controller: orderCardController
};

