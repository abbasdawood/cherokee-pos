function orderNewController() {
  this.text = 'My brand new component!';
}

module.exports = {
  template: require('./orderNew.html'),
  controller: orderNewController
};

