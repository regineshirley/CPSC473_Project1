(function(window) {
    'use strict';
    var FORM_SELECTOR = '[post-topic="form"]';
    var CHECKLIST_SELECTOR = '[post-topic="topiclist"]';
    var SERVER_URL = 'http://localhost:3002/TopicSubmissions';
    var App = window.App;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var CheckList = App.CheckList;
    var remoteDS = new RemoteDataStore(SERVER_URL);
    var checkList = new CheckList(CHECKLIST_SELECTOR, remoteDS);
    var formHandler = new FormHandler(FORM_SELECTOR);

    //Project 1 -LOAD UP THE PAGE WITH TOPICS
    var $ = window.jQuery;
    $.getJSON(SERVER_URL, function(data) {
        $(data).each(function(key, value) {
            checkList.addRow(value);
        });
    });

    //Store submission into database upon "Submit" clicked
    formHandler.addSubmitHandler(function(data) {
        data.id = data.topic;
        data.likes = 0;
        data.dislikes = 0;
        return remoteDS.add.call(remoteDS, data)
            .then(function() {
                checkList.addRow.call(checkList, data);
            });
    });

})(window);
