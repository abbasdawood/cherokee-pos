function productCategoryController() {
  this.text = 'My brand new component!';
}

module.exports = {
  template: require('./productCategory.html'),
  controller: productCategoryController
};

