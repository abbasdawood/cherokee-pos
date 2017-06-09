function sideNavController() {
  this.text = 'side Nav';
}

module.exports = {
  template: require('./sideNav.html'),
  controller: sideNavController
};

