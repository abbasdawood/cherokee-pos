function productPaneController() {
  this.text = 'My brand new component!';
}

module.exports = {
  template: require('./productPane.html'),
  controller: productPaneController
};

