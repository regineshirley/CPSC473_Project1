(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;
  var likesCount = 0;
  var dislikesCount = 0;

  function RemoteDB(url) {
    if (!url) {
        throw new Error('no URL was provided');
    }
    this.serverUrl = url;
  }


// need to change 'topic' to array type to hold
//multiple topics for a test for a particular class.
  RemoteDB.prototype.add = function (key, val) {
    val['id'] = val['course'].concat(val['topic']);
    $.post(this.serverUrl, val, function(serverResponse) {
        console.log(serverResponse);
    })
  };

  RemoteDB.prototype.likes = function (topic) {
    this.data[topic] = likesCount++;
    return likesCount;
  };

  RemoteDB.prototype.dislikes = function (topic) {
    this.data[topic] = dislikesCount++;
    return dislikesCount;
  };

  RemoteDB.prototype.get = function (key) {
    $.get(this.serverUrl + '/' + )
  };

  RemoteDB.prototype.getAll = function () {
    return this.data;
  };



  App.RemoteDB = RemoteDB;
  window.App = App;
})(window);
