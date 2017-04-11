(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector, logindb) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.logindb = logindb;

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }

        FormHandler.prototype.addSubmitHandler = function(fn) {
            this.$formElement.on('submit', function(event) {
                event.preventDefault();

                if (window.isLoggedIn) { //Submit button only works if user is logged in
                    var data = {};
                    $(this).serializeArray().forEach(function(item) {
                        data[item.name] = item.value;
                        console.log(item.name + ' is ' + item.value);
                    });
                    fn(data).then(function() {
                        this.reset();
                        this.elements[0].focus();
                    }.bind(this));
                } else {
                    console.log('You have to log in to post');
                }
            });
        };

        FormHandler.prototype.addRegisterModalSubmitHandler = function() {
            $(document).on('click', '#registerModalBtnId', function() {

                var username = document.getElementById('usernameRegister').value;
                var password = document.getElementById('passwordRegister').value;
                var account = {};
                account.username = username;
                account.password = password;
                account.id = username;

                logindb.add(account);

                $('#registerModal').modal('hide');

            });
        };

        FormHandler.prototype.addLoginModalSubmitHandler = function() {
            $(document).on('click', '#loginModalBtnId', function() {
                var username = document.getElementById('usernameLogin').value;
                var password = document.getElementById('passwordLogin').value;

                var accountList = logindb.getAll();

                var loggedIn = false;
                $(accountList).each(function(index, value) {
                    if (username == value.username && password == value.password) {
                        window.username = username;
                        loggedIn = true;
                    }
                });

                if (loggedIn) {
                    console.log('Logged in');
                    window.isLoggedIn = true;
                    $('#loginBtnId').remove();
                    $('#registerBtnId').remove();
                    $('[for=loggedInDisplay]').html('Logged in as ' + username + '<br /> Refresh to log out');
                } else {
                    console.log('Login failed');
                }

                $('#loginModal').modal('hide');

            });

        };
    }

    App.FormHandler = FormHandler;
    window.App = App;

})(window);
