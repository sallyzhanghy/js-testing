import Events from './events.js';
/**
 * Represents a loan.
 * @constructor
 * @param {Object} attrs - the initial attributes of the loan
 * @param {string} attrs.title - the title or description of the loan
 * @param {number} attrs.principal - the principal amount of the loan
 * @param {number} attrs.rate - the annual interest rate of the loan
 * @param {number} attrs.term - the term in number of years of the loan
 */

var Loan = function Loan(attrs) {
  // used to mixin initial attributes
  this.title = '';
  this.principal = 0.0;
  this.rate = 0.0;
  this.term = 0; // mixin in initial attributes, if present

  if (attrs) {
    for (var attr in attrs) {
      this[attr] = attrs[attr];
    }
  }
}; // mixin observer support


for (var prop in Events.prototype) {
  Loan.prototype[prop] = Events.prototype[prop];
} // get and set as functions to add control (e.g. validation checks)
// use prototype to manage memory consumption

/**
 * Used to set a specific property of a loan
 * @function
 * @name set
 * @param {string} attr - the name of the property to set
 * @param {(number|string)} value - the value for the desired property
 */


Loan.prototype.set = function (attr, value) {
  this[attr] = value;
};
/**
 * Used to get a specific property of a loan
 * @function
 * @name get
 * @param {string} attr - the name of the property to set
 * @returns {(number|string)} the value of the desired property
 */


Loan.prototype.get = function (attr) {
  return this[attr];
};
/** 
 * Calculate the monthly payment of a loan
 * @function
 * @name payment
 * @returns {Number} the monthly payment amount to two decimal places
 */


Loan.prototype.payment = function () {
  return +(this.principal * this.rate / 12 / (1 - Math.pow(1 + this.rate / 12, -this.term * 12))).toFixed(2);
}; // export Loan for global useage


export default Loan;