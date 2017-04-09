(function(window) {
    'use strict';
    var FORM_SELECTOR = '[post-a-topic="form"]';
    var TOPICSLIST_SELECTOR = '[post-topic="topiclist"]';
    var SERVER_URL = 'http://localhost:3002/TopicSubmissions';
    var LOGIN_SERVER_URL = 'http://localhost:3002/LoginAccounts';
    var App = window.App;
    var RemoteDB = App.RemoteDB;
    var LoginDB = App.LoginDB;
    var FormHandler = App.FormHandler;
    var TopicsList = App.TopicsList;
    var remoteDB = new RemoteDB(SERVER_URL);
    var loginDB = new LoginDB(LOGIN_SERVER_URL);
    var topicsList = new TopicsList(TOPICSLIST_SELECTOR, remoteDB);
    var formHandler = new FormHandler(FORM_SELECTOR, loginDB);

    //Project 1 -LOAD UP THE PAGE WITH TOPICS
    var $ = window.jQuery;
    $.get(SERVER_URL, function(data) {
        $(data).each(function(key, value) {
            topicsList.addRow(value);
        });
    });

    //On topic submit button
    formHandler.addSubmitHandler(function(data) {
        data.id = data.topic;
        data.likes = 0;
        data.dislikes = 0;
        data.likesEmail = '';
        data.dislikesEmail = '';
        return remoteDB.add.call(remoteDB, data)
            .then(function() {
                topicsList.addRow.call(topicsList, data);
            });
    });

    //Login modal submit
    formHandler.addLoginModalSubmitHandler();

    //Register modal submit
    formHandler.addRegisterModalSubmitHandler();
})(window);
