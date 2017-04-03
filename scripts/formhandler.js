// write code for email validation and form handling stuff
(function (window) {
  'use strict';
  var App = window.App;
  $ = window.jQuery;
  function VoteHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with the selector: ' + selector);
        }
    }
  VoteHandler.prototype.addSubmitHandler = function (fn) {
    this.$formElement.on('submit', function(event) {
        event.preventDefault();

    })
  };

})(window);
