(function (window) {
  'use strict';
  var App = window.App || {};

  function Course(courseID, db) {
    this.courseID = courseID;
    this.db = db;
  }

  Course.prototype.postTopic = function (topic) {
    console.log('Posting a topic for ' + topic.testID);
    this.db.add(topic.testID, topic);
  };

  Course.prototype.topicLikes = function (topic) {
    var count = this.db.likes(topic);
    console.log(topic.topicTitle + ' likes count: ' + count);
  };

  Course.prototype.topicDislikes = function (topic) {
    var count = this.db.dislikes(topic);
    console.log(topic.topicTitle + ' dislikes count: ' + count);
  };

  Course.prototype.searchCourse = function () {
    var courseArray = Object.keys(this.db.getAll());
    courseArray.forEach( function (id) {
      console.log(this.db.get(id));
    }.bind(this));
  };

  App.Course = Course;
  window.App = App;

})(window);
