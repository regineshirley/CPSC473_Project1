(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function RemoteDB(url) {
        if (!url) {
            throw new Error('No remote URL supplied.');
        }

        this.serverUrl = url;
        this.data = {}; //create empty object
    }

    //Update the server with the new object
    RemoteDB.prototype.update = function(topic) {
        $.ajax({
            url: this.serverUrl + '/' + topic.id,
            type: 'PUT',
            data: JSON.stringify(topic),
            dataType: 'json',
            contentType: 'application/json',
            success: function() {
                console.log('Updated server');
            }
        });
    };

    //Add an object to the server
    RemoteDB.prototype.add = function(topic) {
        return $.post(this.serverUrl, topic, function(serverResponse) {
            console.log(serverResponse);
        });
    };

    //Get all objects from the server
    RemoteDB.prototype.getAll = function(cb) {
        return $.get(this.serverUrl, function(serverResponse) {
            if (cb) {
                console.log(serverResponse);
                cb(serverResponse);
            }
        });
    };

    //Get one object from the server
    RemoteDB.prototype.get = function(key) {
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

    App.RemoteDB = RemoteDB;
    window.App = App;
})(window);
