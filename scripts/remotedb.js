(function(window) {
    'use strict';
    var App = window.App || {};

    function RemoteDB(url) {
        if (!url) {
            throw new Error('No remote URL supplied.');
        }

        this.serverUrl = url;
        this.data = {}; //create empty object
    }


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
        // var obj = {}; //create empty object
        // for (var key in this.data) { //iterate through each key in obj
        //     var value = this.data[key]; //value = key of obj
        //
        //     if (value === course) { //if value === course
        //         obj[key] = value; //add values to obj
        //         //console.log('course: ' + value +' topic: ' + key);
        //     }
        // }
        // //return obj; //return obj object
        // return $.get(this.serverUrl + '/' + course, function(serverResponse) {
        //   if (cb) {
        //     console.log(serverResponse);
        //     cb(serverResponse);
        //   }
        // });

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

    RemoteDB.prototype.remove = function(key) {
        return $.ajax(this.serverUrl + '/' + key, {
            type: 'DELETE',
            async: false
        });
    };

    App.RemoteDB = RemoteDB;
    window.App = App;
})(window);
