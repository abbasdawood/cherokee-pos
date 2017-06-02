module.exports = {
  template: require('./hello.html'),
  controller: function ($scope, $log) {
    this.hello = 'Hello World!';
  }
};