(function (window) {
  'use strict';
  var App = window.App;
  var Course = App.Course;
  var RemoteDB = App.RemoteDB;
  var Course1 = new Course('CPSC473', new RemoteDB());
  var Course2 = new Course('CPSC466', new RemoteDB());

  window.Course1 = Course1;
  window.Course2 = Course2;
})(window);
