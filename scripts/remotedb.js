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

    RemoteDB.prototype.update = function(topic) {
        $.ajax({
            url: this.serverUrl + '/' + topic.id,
            type: 'PUT',
            data: JSON.stringify(topic),
            dataType: 'json',
            contentType: 'application/json',
            success: function(data) {
                console.log('Updated server');
            }
        });
    };

    RemoteDB.prototype.add = function(topic, course) {
        return $.post(this.serverUrl, topic, function(serverResponse) {
            console.log(serverResponse);
        });

        //this.data[topic] = course; //{key = topic & val = course} topic is unique
    };

    RemoteDB.prototype.getAll = function(cb) {
        return $.get(this.serverUrl, function(serverResponse) {
            if (cb) {
                console.log(serverResponse);
                cb(serverResponse);
            }
        });
        //return this.data;
    };

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

    //Don't need ATM
    RemoteDB.prototype.remove = function(key) {
        return $.ajax(this.serverUrl + '/' + key, {
            type: 'DELETE'
        });
    };

    App.RemoteDB = RemoteDB;
    window.App = App;
})(window);
