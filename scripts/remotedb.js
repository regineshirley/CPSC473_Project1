(function (window) {
  'use strict';
  var App = window.App || {};
  var likesCount = 0;
  var dislikesCount = 0;

  function RemoteDB() {
    this.data = {};
  }


// need to change 'topic' to array type to hold
//multiple topics for a test for a particular class.
  RemoteDB.prototype.add = function (test, topic) {
    this.data[test] = topic;
  };

  RemoteDB.prototype.likes = function (topic) {
    this.data[topic] = likesCount++;
    return likesCount;
  };

  RemoteDB.prototype.dislikes = function (topic) {
    this.data[topic] = dislikesCount++;
    return dislikesCount;
  };

  RemoteDB.prototype.get = function (test) {
    return this.data[test];
  };

  RemoteDB.prototype.getAll = function () {
    return this.data;
  };



  App.RemoteDB = RemoteDB;
  window.App = App;
})(window);
