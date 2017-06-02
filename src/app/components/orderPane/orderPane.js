function orderPaneController() {
  this.text = 'My brand new component!';
}

module.exports = {
  template: require('./orderPane.html'),
  controller: orderPaneController
};

