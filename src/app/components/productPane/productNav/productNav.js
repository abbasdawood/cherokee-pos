function productNavController() {
  this.text = 'My brand new component!';
}

module.exports = {
  template: require('./productNav.html'),
  controller: productNavController
};

