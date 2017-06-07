function mainFrameController() {
  this.text = 'My brand new component!';
}

module.exports = {
  template: require('./mainFrame.html'),
  controller: mainFrameController
};

