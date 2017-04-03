(function (window) {
  'use strict';
  var App = window.App || {};

  function CS(db) {
    this.db = db;
  }

  CS.prototype.postTopic = function (post) {
    console.log('Posting a topic for: ' + post.course);
    return this.db.add(post.topic, post.course);
  };

  CS.prototype.listTopics = function () {
      var topicsArray = Object.values(this.db.getAll());

     topicsArray.forEach(function (id) {
       console.log(this.db.get(id));
     }.bind(this));
  };

  App.CS = CS;
  window.App = App;

})(window);
