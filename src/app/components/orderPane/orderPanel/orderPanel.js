function orderPanelController() {
  this.text = 'My brand new component!';
}

module.exports = {
  template: require('./orderPanel.html'),
  controller: orderPanelController
};

