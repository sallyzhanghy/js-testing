var Events = function Events() {};
/**
 * Used to register an observer function
 * @function
 * @name on
 * @param {String} event - the name of the event to observe
 * @param {Function} callback - the callback function to call when the event is triggered
 */


Events.prototype.on = function (event, callback) {
  this.callbacks || (this.callbacks = {});
  this.callbacks[event] || (this.callbacks[event] = []);
  callback.bind(this); // bind the function the loan object

  this.callbacks[event].push(callback);
};
/**
 * Used to trigger an event and call all observer functions, if any. The observer
 * functions will be passed the 'this' arg as the first argument.
 * @function
 * @name trigger
 * @param {String} event - the name of the event to trigger
 */


Events.prototype.trigger = function (event) {
  var callbacks,
      _this = this;

  if (this.callbacks && this.callbacks[event]) {
    callbacks = this.callbacks[event]; // if an arrow function is used for the forEach callback below,
    // then there would be no need to save reference _this BUT, then you
    // also wouldn't be able to pass a callback that has a reference to 'this'
    // e.g. 
    //      callbacks.forEach(callback => {
    //          callback(this);
    //      });
    // for more, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_separate_this

    callbacks.forEach(function (callback) {
      callback.call(_this, _this);
    });
  }
};
/**
 * Used to unregister an observer function
 * Note this will only work if a registered function has a name
 * @function
 * @name off
 * @param {String} event - the name of the event to observe
 * @param {String} callback - the name of the callback function to unregister
 * @returns {(function|undefined)} the first matched function or undefined if none could be found
 */


Events.prototype.off = function (event, callback) {
  // check for event support
  if (this.callbacks[event]) {
    // loop through all registered callbacks and splice matches from the array
    for (var i = 0, len = this.callbacks[event].length; i < len; i += 1) {
      if (this.callbacks[event][i].name === callback) {
        return this.callbacks[event].splice(i, 1)[0];
      }
    }
  }
}; // export Events for global useage


export default Events;