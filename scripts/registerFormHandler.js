(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function RegisterFormHandler(selector, logindb) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.logindb = logindb;

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }

        RegisterFormHandler.prototype.addSubmitHandler = function() {
            this.$formElement.on('submit', function(event) {
                event.preventDefault();
                //Code to submit to database
                var username = document.getElementById('usernameRegister').value;
                var password = document.getElementById('passwordRegister').value;
                var account = {};
                account.username = username;
                account.password = password;
                account.id = username;

                var accountList = logindb.getAll();

                $(accountList).each(function(index, value) {
                    if (username === value.username) {
                        window.isRegistered = true;
                    }
                });

                if (window.isRegistered) {
                    $('#alreadyRegisterModal').modal('show');
                    window.isRegistered = false;
                } else {
                    logindb.add(account);

                    window.isLoggedIn = true;
                    $('#loginBtnId').remove();
                    $('#registerBtnId').remove();
                    $('[for=loggedInDisplay]').html('Logged in as ' + username + '<br /> Refresh to log out');

                    this.reset();
                    $('#registerModal').modal('hide');
                }
            });
        };

        RegisterFormHandler.prototype.addInputHandler = function(fn) {
            console.log('Setting input handler for form');

            this.$formElement.on('input', '[name="Username"]', function(event) {
                var emailAddress = event.target.value;
                var message = '';
                if (fn(emailAddress)) {
                    event.target.setCustomValidity('');
                } else {
                    message = emailAddress + ' is not an authorized email address!';
                    event.target.setCustomValidity(message);
                }
            });
        };

    }

    App.RegisterFormHandler = RegisterFormHandler;
    window.App = App;

})(window);
