// order contoller functions 

/**
 * Function to get order details
 * @param  {string} id string is the id of order
 * @return {object}    a json object 
 */
function showOrderDetails(id) {
  // body...
}


//orderNav contoller functions

/**
 * function to select tab 
 * @param  {string} style type of the order is passes
 * @return {string}       type of order is returned
 */
function selectTab(style) {
  $scope.$emit('getorders', 'style');

  // body...
}

/**
 * function to know the no. of active orders
 * @param  {string} style the type of order is passed
 * @return {integer}       return a number which tells all the active orders of that type
 */
function noOfActiveOrder(style) {

  // body...
}

//orderPanel controller functions
/**
 * fucntion to display orders according to the type of order
 * @param  {string} $scope the type of order which we got from nav bar
 * @return {[type]}        [description]
 */
function orderList($scope) {
  $scope.$on("getorders", function (event, style) {
      // body...
    })
    // body...
}

// New order controller


/**
 * function to create a new order
 * @param  {string} style    the type of order
 * @param  {number} employee it will pass employee's number
 * @param  {string} refeence pass the reference
 * @return {string}          id of the new order created
 */
function newOrder(style, employee, refeence) {
  $scope.$brodcast('init order', 'id')
    // body...
}


// order details controller


/**
 * function to add items to a order
 * @param {string} orderIds   id of the order to which the items are to be added
 * @param {[string]} itemIds  array of item ids
 */
function addItem(orderId, itemIds) {
  // body...
}

/**
 * function to delete an item
 * @param  {string} itemId the id of the item to be deleted
 * @return {string}        id of the item which is deleted
 */
function itemDeletion(itemId) {
  // body...
}
/**
 * function to calculate offers
 * @param  {orderId} orderId id of the offer selected
 * @return {object}         object containing the name and the percent discounted
 */
function offers(orderId) {
  // body...
}

/**
 * function to calculate charges and taxes
 * @param  {string} orderId id of the order on which charges and taxes have to be calculated
 * @return {object}         object containing the charges and the taxes
 */
function charges(orderId) {
  // body...
}

/**
 * function to print or display bill
 * @param  {string} typeOfView type of view wanted
 * @return {object}            object containing the details of the bill to ve viewed
 */
function printBill(typeOfView) {
  // body...
}

/**
 * function to validate pin of the employee
 * @param  {sting} pin pin of the employee
 * @return {boolean}     true or false value 
 */
function pinValidation(pin) {
  // body...
}