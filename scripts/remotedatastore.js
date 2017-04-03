(function(window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function RemoteDataStore(url) {
        if (!url) {
            throw new Error('No remote URL supplied');
        }

        this.serverUrl = url;
    }

    RemoteDataStore.prototype.add = function(val) {
        return $.post(this.serverUrl, val, function(serverResponse) {
            console.log(serverResponse);
        });
    };

    RemoteDataStore.prototype.getAll = function(cb) {
        return $.get(this.serverUrl, function(serverResponse) {
            if (cb) {
                console.log(serverResponse);
                cb(serverResponse);
            }
        });
    };

    RemoteDataStore.prototype.get = function(key) {
        var obj;
        $.ajax({
            url: this.serverUrl,
            dataType: 'json',
            type: 'get',
            cache: false,
            async: false,
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

    RemoteDataStore.prototype.remove = function(key) {
        return $.ajax(this.serverUrl + '/' + key, {
            type: 'DELETE',
            async: false
        });
    };

    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
})(window);
