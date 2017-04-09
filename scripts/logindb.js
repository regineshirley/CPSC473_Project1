(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function LoginDB(url) {
        if (!url) {
            throw new Error('No remote URL supplied.');
        }

        this.serverUrl = url;
        this.data = {}; //create empty object
    }

    LoginDB.prototype.add = function(account) {
        return $.post(this.serverUrl, account, function(serverResponse) {
            console.log(serverResponse);
        });
    };

    LoginDB.prototype.getAll = function() {
        var list = [];
        $.ajax({
            url: this.serverUrl,
            dataType: 'json',
            type: 'get',
            cache: false,
            async: false,
            success: function(data) {
                $(data).each(function(index, value) {
                    list.push(value);
                });
            }
        });

        return list;
    };

    LoginDB.prototype.get = function(key) {
        var obj;
        $.ajax({
            url: this.serverUrl,
            dataType: 'json',
            type: 'get',
            cache: false,
            success: function(data) {
                $(data).each(function(index, value) {
                    if (this.id == key) {
                        obj = value;
                    }
                });
            }
        });

        return obj;
    };

    App.LoginDB = LoginDB;
    window.App = App;
})(window);
