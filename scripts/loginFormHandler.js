(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function LoginFormHandler(selector, logindb) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.logindb = logindb;

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }

        LoginFormHandler.prototype.addSubmitHandler = function() {
            this.$formElement.on('submit', function(event) {
                event.preventDefault();
                //Code to login to database
                var username = document.getElementById('usernameLogin').value;
                var password = document.getElementById('passwordLogin').value;

                var accountList = logindb.getAll();

                var loggedIn = false;
                $(accountList).each(function(index, value) {
                    if (username == value.username && password == value.password) {
                        window.username = username;
                        loggedIn = true;
                    } else {
                        var message = 'wrong password';
                        event.target.setCustomValidity(message);
                    }
                }.bind(this));

                if (loggedIn) {
                    console.log('Logged in');
                    window.isLoggedIn = true;
                    $('#loginBtnId').remove();
                    $('#registerBtnId').remove();
                    $('[for=loggedInDisplay]').html('Logged in as ' + username + '<br /> Refresh to log out');
                } else {
                    console.log('Login failed');
                }

                this.reset();
                $('#loginModal').modal('hide');
            });
        };

    }

    App.LoginFormHandler = LoginFormHandler;
    window.App = App;

})(window);
