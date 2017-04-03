(function (window) {
  'use strict';
  var SERVER_URL = 'http://localhost:3002/topics';
  var App = window.App;
  var Course = App.Course;
  var RemoteDB = App.RemoteDB;
  var Course1 = new Course('CPSC473', new RemoteDB());
  var Course2 = new Course('CPSC466', new RemoteDB());
  var database = new RemoteDB(SERVER_URL);
  window.Course1 = Course1;
  window.Course2 = Course2;
})(window);
