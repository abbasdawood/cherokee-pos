function productPanelController() {
  this.text = 'My brand new component!';
}

module.exports = {
  template: require('./productPanel.html'),
  controller: productPanelController
};

